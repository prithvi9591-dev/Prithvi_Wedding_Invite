import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Run directly in IntelliJ IDEA or terminal:
 * java guest-generator/GuestGenerator.java
 */
public class GuestGenerator {

    // Update this with your live Vercel / Cloudflare Pages URL after deployment
    private static final String BASE_URL = "http://localhost:5173";

    public static void main(String[] args) throws IOException {
        Path csvPath = Paths.get("guest-generator/guests-input.csv");
        Path jsonOutPath = Paths.get("public/guests.json");
        Path linksOutPath = Paths.get("guest-generator/whatsapp-links.txt");

        if (!Files.exists(csvPath)) {
            // Handle case where user runs directly from inside guest-generator directory
            csvPath = Paths.get("guests-input.csv");
            jsonOutPath = Paths.get("../public/guests.json");
            linksOutPath = Paths.get("whatsapp-links.txt");
        }

        List<String> lines = Files.readAllLines(csvPath, StandardCharsets.UTF_8);
        StringBuilder jsonBuilder = new StringBuilder("{\n");
        List<String> shareableLinks = new ArrayList<>();

        int count = 0;
        for (String line : lines) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.split(",", 3);
            if (parts.length < 3) continue;

            String rawName = parts[0].trim();
            String salutation = parts[1].trim();
            String customMessage = parts[2].trim();

            // Create URL-safe slug: "Prathamesh" -> "prathamesh", "Rahul Sharma" -> "rahul-sharma"
            String slug = rawName.toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-");

            if (count > 0) {
                jsonBuilder.append(",\n");
            }

            jsonBuilder.append(String.format(
                "  \"%s\": {\n    \"name\": \"%s\",\n    \"salutation\": \"%s\",\n    \"message\": \"%s\"\n  }",
                escapeJson(slug), escapeJson(rawName), escapeJson(salutation), escapeJson(customMessage)
            ));

            String inviteLink = BASE_URL + "/?g=" + slug;
            String previewThankYouLink = BASE_URL + "/?g=" + slug + "&preview=thankyou";
            shareableLinks.add(rawName + " (Invite Link)    -> " + inviteLink);
            shareableLinks.add(rawName + " (ThankYou Test)  -> " + previewThankYouLink);
            shareableLinks.add("----------------------------------------------------------------------");
            count++;
        }

        jsonBuilder.append("\n}\n");

        Files.createDirectories(jsonOutPath.getParent());
        Files.writeString(jsonOutPath, jsonBuilder.toString(), StandardCharsets.UTF_8);
        Files.write(linksOutPath, shareableLinks, StandardCharsets.UTF_8);

        System.out.println("Successfully generated guests.json with " + count + " guests!");
        System.out.println("JSON saved to: " + jsonOutPath.toAbsolutePath());
        System.out.println("Shareable links saved to: " + linksOutPath.toAbsolutePath());
    }

    private static String escapeJson(String input) {
        return input.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
