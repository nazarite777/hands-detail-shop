#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re

files_to_fix = [
    "reviews.html",
    "aircraft-services.html",
    "blog-auto-detailing-guide.html",
    "fleet-services.html",
    "marine-services.html",
    "motorcycle-services.html",
    "personal-vehicles.html",
    "gift-certificates.html"
]

# Mapping of corrupted patterns to proper emojis
replacements = [
    ("ðŸ•'", "🕒"),      # clock
    ("ðŸ"ž", "📞"),      # phone
    ("ðŸ'¬", "💬"),      # chat bubble
    ("ðŸ'Ž", "💎"),      # gem
    ("ðŸ'³", "💳"),      # credit card
    ("ðŸ"", "📍"),       # location pin
    ("ðŸš—", "🚗"),      # car
    ("ðŸ'", "✨"),       # sparkles
]

for filename in files_to_fix:
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        continue
    
    try:
        # Read file with UTF-8 encoding
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_length = len(content)
        
        # Apply all replacements
        for corrupted, proper in replacements:
            content = content.replace(corrupted, proper)
        
        # Write back with UTF-8 encoding
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        new_length = len(content)
        print(f"✓ Fixed {filename} (Length: {original_length} → {new_length})")
        
    except Exception as e:
        print(f"✗ Error processing {filename}: {str(e)}")

print("\nEmoji corruption fix complete!")
