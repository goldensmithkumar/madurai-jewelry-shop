import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

function getPublicUrl(bucket: string, filePath: string): string {
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const bucket = formData.get("bucket") as string;
        const customPrefix = formData.get("customPrefix") as string;

        // Advanced Metadata capturing
        const material = formData.get("material") as string;
        const category = formData.get("category") as string;
        const name = formData.get("name") as string;
        const weightGrams = formData.get("weightGrams") as string;

        // Dual Upload Processing (Before image for engraving)
        const fileBefore = formData.get("fileBefore") as File | null;

        if (!file || !bucket) {
            return NextResponse.json({ error: "File and bucket are required." }, { status: 400 });
        }

        // Upload main file to Supabase Storage
        const buffer = Buffer.from(await file.arrayBuffer());
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const fileName = customPrefix
            ? `${customPrefix}-${Date.now()}-${safeName}`
            : `${Date.now()}-${safeName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const imageUrl = getPublicUrl(bucket, fileName);

        // Upload Before file if present (engraving showcase)
        let beforeImageUrl: string | null = null;
        if (fileBefore && fileBefore.size > 0) {
            const bufferBefore = Buffer.from(await fileBefore.arrayBuffer());
            const safeNameBefore = fileBefore.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
            const fileNameBefore = `before-${Date.now()}-${safeNameBefore}`;

            const { error: beforeError } = await supabase.storage
                .from(bucket)
                .upload(fileNameBefore, bufferBefore, {
                    contentType: fileBefore.type,
                    upsert: false,
                });

            if (!beforeError) {
                beforeImageUrl = getPublicUrl(bucket, fileNameBefore);
            }
        }

        // Store product metadata in database
        if (bucket === 'shop_images' && material && category && name && weightGrams) {
            await prisma.product.create({
                data: {
                    material,
                    category,
                    name,
                    weightGrams,
                    bucket,
                    imageUrl,
                }
            });
        } else if (bucket === 'engraving_showcase' && material && category && name) {
            await prisma.product.create({
                data: {
                    material,
                    category,
                    name,
                    weightGrams: "Engraved",
                    bucket,
                    imageUrl,
                    secondaryImageUrl: beforeImageUrl,
                }
            });
        }

        return NextResponse.json({ success: true, url: imageUrl, name: fileName });
    } catch (e: any) {
        console.error("Upload API error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const bucket = searchParams.get("bucket");
    if (!bucket) return NextResponse.json({ error: "Bucket required" }, { status: 400 });

    try {
        // For shop_images and engraving_showcase, serve enriched data from DB
        if (bucket === 'shop_images' || bucket === 'engraving_showcase') {
            const products = await prisma.product.findMany({
                where: { bucket },
                orderBy: { createdAt: 'desc' }
            });

            const enrichedResult = products.map((p: any) => ({
                id: p.id,
                material: p.material,
                category: p.category,
                weightGrams: p.weightGrams,
                name: p.name,
                url: p.imageUrl,
                urlBefore: p.secondaryImageUrl || null
            }));

            return NextResponse.json(enrichedResult);
        }

        // For hero_images and other buckets, list files from Supabase Storage
        const { data: files, error } = await supabase.storage
            .from(bucket)
            .list('', { sortBy: { column: 'created_at', order: 'desc' } });

        if (error) {
            console.error("Supabase list error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const result = (files || [])
            .filter(f => !f.name.startsWith('.'))
            .map(f => ({
                name: f.name,
                url: getPublicUrl(bucket, f.name)
            }));

        return NextResponse.json(result);
    } catch (e: any) {
        console.error("Upload GET error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
