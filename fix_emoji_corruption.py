#!/usr/bin/env python3
"""
Fix corrupted UTF-8 emoji characters in HTML files.
Replaces broken byte sequences with proper emoji characters.
"""

import os
import re
from pathlib import Path

# Define corruption mappings - corrupted bytes to proper emojis
EMOJI_FIXES = {
    'ðŸ"': '📍',        # Location pin
    'ðŸ"ž': '📞',       # Phone
    'ðŸ'¬': '💬',       # Chat bubble
    'ðŸ•'': '🕒',       # Clock
    'ðŸŽŠ': '🎊',       # Party popper
    'ðŸ'Ž': '💎',       # Gem
    'ðŸ'³': '💳',       # Credit card
    'ðŸ'': '⭐',        # Star (for corrupted star patterns)
    'â­\x80': '⭐',      # Alternative star pattern
}

# Files to process
FILES_TO_FIX = [
    'reviews.html',
    'aircraft-services.html',
    'blog-auto-detailing-guide.html',
    'fleet-services.html',
    'marine-services.html',
    'motorcycle-services.html',
    'personal-vehicles.html',
    'gift-certificates.html',
]

def fix_emojis_in_file(filepath):
    """Fix corrupted emojis in a single file."""
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return False
    
    try:
        # Read file with UTF-8 encoding
        with open(filepath, 'r', encoding='utf-8', errors='surrogateescape') as f:
            content = f.read()
        
        original_content = content
        fixes_made = 0
        
        # Apply each emoji fix
        for corrupted, proper in EMOJI_FIXES.items():
            if corrupted in content:
                count = content.count(corrupted)
                content = content.replace(corrupted, proper)
                fixes_made += count
                print(f"  {corrupted} → {proper}: {count} replacements")
        
        # Write back if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed {fixes_made} emojis in {os.path.basename(filepath)}")
            return True
        else:
            print(f"⚠️  No corrupted emojis found in {os.path.basename(filepath)}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all files."""
    print("Starting emoji corruption fix...\n")
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    files_processed = 0
    files_fixed = 0
    
    for filename in FILES_TO_FIX:
        filepath = os.path.join(base_dir, filename)
        print(f"Processing: {filename}")
        if fix_emojis_in_file(filepath):
            files_fixed += 1
        files_processed += 1
        print()
    
    print(f"\n📊 Summary: {files_fixed}/{files_processed} files fixed")

if __name__ == '__main__':
    main()
