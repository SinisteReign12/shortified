import { GoogleGenerativeAI }
    from "@google/generative-ai";

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );


export async function POST(req) {
    try {
        const { url } = await req.json();

        const model =
            genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
            });

        const prompt = `
Suggest 5 short URL aliases for:

${url}

Only return aliases.
One alias per line.
`;

        const result =
            await model.generateContent(
                prompt
            );

        const text =
            result.response.text();

        return Response.json({
            success: true,
            aliases: text
                .split("\n")
                .filter(Boolean),
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message,
        });
    }
}