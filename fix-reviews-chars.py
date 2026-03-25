#!/usr/bin/env python3
"""Fix corrupted emoji characters in reviews.html"""

import sys

# Read the file
try:
    with open('reviews.html', 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    sys.exit(1)

# Define character replacements
replacements = {
    'â˜…': '⭐',           # Star emoji
    'ðŸ•'': '🕐',         # Clock emoji
    'ðŸ"ž': '📞',         # Phone emoji
    'ðŸ'¬': '💬',         # Chat bubble
    'ðŸŽŠ': '🎊',         # Party popper
    'ðŸ'Ž': '💎',         # Diamond
    'ðŸ'³': '💳',         # Credit card
    'ðŸ\"': '📍',         # Location pin
    'ðŸŒŠ': '🌊',         # Wave
    'âœ‰ï¸': '✉️',        # Envelope
    'ðŸ"§': '🔧',         # Wrench
    'ðŸ\"©': '📩',         # Inbox
    'â€"': '–',           # En dash
}

# Apply replacements
for old, new in replacements.items():
    content = content.replace(old, new)

# Write the file back
try:
    with open('reviews.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✓ Successfully fixed corrupted characters in reviews.html")
except Exception as e:
    print(f"Error writing file: {e}")
    sys.exit(1)
