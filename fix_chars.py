#!/usr/bin/env python3
import os
import glob

# Using raw byte replacements
replacements = [
    (b'\xc3\xb0\xc5\xb8\xe2\x80\xa2\xe2\x80\x91', '\U0001f4cb'),  # All Services/chart emoji
    (b'\xc3\xb0\xc5\xb8\xc2\xa0\xc2\x90\xc2\xb0', '\U0001f697'),  # Personal Vehicles
    (b'\xc3\xb0\xc5\xb8\xc2\xbb\xc2\xa5\xc3\xaf\xc2\xb8\xc2\x8f', '\U0001f6a5\ufe0f'),  # Yacht
    (b'\xc3\xb0\xc5\xb8\xc2\xa0\xc2\x9b', '\U0001f69b'),  # Fleet
    (b'\xc3\xb0\xc5\xb8\xc3\xaf\xc2\xb8', '\U0001f3cd\ufe0f'),  # Motorcycle
    (b'\xc3\xa2\xc2\x9c\xc2\x88\xc3\xaf\xc2\xb8\xc2\x8f', '\u2708\ufe0f'),  # Aircraft
]

root_dir = r'c:\users\cbevv\hands-detail-shop'
html_files = glob.glob(os.path.join(root_dir, '**/*.html'), recursive=True)

print(f"Found {len(html_files)} HTML files\n")

fixed_count = 0

for file_path in sorted(html_files):
    try:
        with open(file_path, 'rb') as f:
            content = f.read()
        
        original = content
        modified = False
        
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new.encode('utf-8'))
                modified = True
        
        if modified:
            with open(file_path, 'wb') as f:
                f.write(content)
            rel_path = os.path.relpath(file_path, root_dir)
            print(f"✓ {rel_path}")
            fixed_count += 1
    except Exception as e:
        print(f"✗ Error in {file_path}: {e}")

print(f"\n✓ Summary: Fixed {fixed_count} files")
