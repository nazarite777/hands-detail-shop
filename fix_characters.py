#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import glob

replacements = [
    ('ðŸ"‹', '\U0001f4cb'),  # All Services
    ('ðŸš—', '\U0001f697'),  # Personal Vehicles
    ('ðŸ›¥ï¸', '\U0001f6a5\ufe0f'),  # Yacht/RV
    ('ðŸš›', '\U0001f69b'),  # Fleet
    ('ðŸï¸', '\U0001f3cd\ufe0f'),  # Motorcycle
    ('âœˆï¸', '\u2708\ufe0f'),  # Aircraft
    ('ðŸ•'', '\U0001f550'),  # Clock
    ('ðŸ"ž', '\U0001f4de'),  # Phone
    ('ðŸ'¬', '\U0001f4ac'),  # Chat
    ('ðŸŽŠ', '\U0001f38a'),  # Confetti
    ('ðŸ'Ž', '\U0001f48e'),  # Diamond
    ('ðŸ'³', '\U0001f4b3'),  # Credit Card
    ('ðŸ"', '\U0001f4cd'),  # Pin
]

root_dir = r'c:\users\cbevv\hands-detail-shop'
html_files = glob.glob(os.path.join(root_dir, '**/*.html'), recursive=True)

print(f"Found {len(html_files)} HTML files\n")

fixed_count = 0

for file_path in sorted(html_files):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            rel_path = os.path.relpath(file_path, root_dir)
            print(f"✓ {rel_path}")
            fixed_count += 1
    except Exception as e:
        print(f"✗ Error in {file_path}: {e}")

print(f"\n✓ Summary: Fixed {fixed_count} files")
