#!/usr/bin/env python3
"""Fix corrupted emoji and special characters across all HTML files"""

import os
import glob
from pathlib import Path

# Character replacements mapping
REPLACEMENTS = {
    'â˜…': '⭐',           # Star emoji
    'ðŸ•'': '🕐',         # Clock emoji
    'ðŸ"ž': '📞',         # Phone emoji
    'ðŸ'¬': '💬',         # Chat bubble
    'ðŸŽŠ': '🎊',         # Party popper
    'ðŸ'Ž': '💎',         # Diamond
    'ðŸ'³': '💳',         # Credit card
    'ðŸ"': '📍',          # Location pin
    'ðŸŒŠ': '🌊',         # Wave
    'âœ‰ï¸': '✉️',        # Envelope
    'ðŸ"§': '🔧',         # Wrench
    'ðŸ"©': '📩',         # Inbox
    'ðŸ†ðŸ»': '💪',       # Muscle
    'ðŸ'': '💪',          # Muscle (alt)
    'ðŸ'': '💼',          # Briefcase
    'ðŸŸ': '🟠',          # Orange circle
    'â€"': '–',            # En dash
    'ðŸŚ': '🌈',          # Rainbow
    'ðŸ‡ºðŸ‡¸': '🇺🇸',   # US flag
    'ðŸŸ¢': '🟢',         # Green circle
    'ðŸŸ¥': '🟥',         # Red square
}

def fix_file(filepath):
    """Fix corrupted characters in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old, new in REPLACEMENTS.items():
            content = content.replace(old, new)
        
        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, len([1 for old in REPLACEMENTS if old in original_content])
        return False, 0
        
    except Exception as e:
        return None, str(e)

def main():
    """Process all HTML files in workspace"""
    # Find all HTML files
    html_files = glob.glob('**/*.html', recursive=True)
    
    if not html_files:
        print("❌ No HTML files found")
        return
    
    print(f"Found {len(html_files)} HTML files")
    print("Processing...\n")
    
    fixed_count = 0
    total_replacements = 0
    errors = []
    
    for filepath in html_files:
        result, count = fix_file(filepath)
        
        if result is None:
            errors.append(f"  ⚠️  {filepath}: {count}")
        elif result:
            fixed_count += 1
            total_replacements += count
            print(f"  ✓ {filepath} ({count} replacements)")
        else:
            print(f"  - {filepath} (no changes needed)")
    
    print(f"\n{'='*60}")
    print(f"✓ Summary")
    print(f"{'='*60}")
    print(f"Files processed: {len(html_files)}")
    print(f"Files fixed: {fixed_count}")
    print(f"Total replacements: {total_replacements}")
    
    if errors:
        print(f"\nErrors ({len(errors)}):")
        for error in errors:
            print(error)
    
    if fixed_count > 0:
        print(f"\n✅ Successfully fixed corrupted characters!")
    else:
        print(f"\n✅ All files already have correct characters!")

if __name__ == '__main__':
    main()
