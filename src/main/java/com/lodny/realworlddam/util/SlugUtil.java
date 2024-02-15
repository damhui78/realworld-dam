package com.lodny.realworlddam.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;


public class SlugUtil {

    public static String generateSlug(String input) {
        if (input == null) {
            return "";
        }

        // Unicode normalization
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);

        // Remove diacritic marks
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String withoutDiacritics = pattern.matcher(normalized).replaceAll("");

        // Replace spaces with hyphens and convert to lowercase
        String slug = withoutDiacritics.replaceAll("\\s", "-").toLowerCase(Locale.ENGLISH);

        // Remove unwanted characters
        slug = slug.replaceAll("[^a-z0-9\\-]", "");

        return slug;
    }

}
