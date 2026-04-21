"""Fix motorcycle-services.html and under-the-hood.html:
- Remove inline chat widget HTML
- Add booking modal
- Add pwa-installer.js script
"""
import os

FOOTER_NOTE = '<p class="form-footer-note">Or call us directly: <strong>(412) 752-8684</strong></p>'
DEPOSIT_BOX = '''            <div style="background: rgba(66, 165, 245, 0.15); border: 1px solid #42a5f5; border-radius: 10px; padding: 12px 15px; margin: 0 20px 20px 20px; text-align: center;">
                <p style="color: #42a5f5; font-weight: 600; margin: 0;">&#x1F4B3; $30 DEPOSIT SECURES YOUR APPOINTMENT</p>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin: 5px 0 0 0;">Applied toward your total service cost</p>
            </div>'''

SCRIPTS = '''    <script src="main.js"></script>
    <script src="pwa-installer.js"></script>
    <script src="/chat-widget.js"></script>
</body>
</html>'''

def make_modal(title, vehicle_label, vehicle_placeholder, services):
    options = "\n".join(f'                        <option>{s}</option>' for s in services)
    return f'''
    <!-- Booking Modal -->
    <div class="modal" id="bookingModal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeBookingModal()">&times;</button>
                <h2 class="modal-title">{title}</h2>
                <p class="modal-subtitle">Get a free quote or schedule your appointment</p>
            </div>
{DEPOSIT_BOX}
            <form class="modal-form" id="bookingForm">
                <div class="form-group"><label>Name *</label><input type="text" required placeholder="Your full name"></div>
                <div class="form-group"><label>Phone *</label><input type="tel" required placeholder="(412) 555-0000"></div>
                <div class="form-group"><label>Email</label><input type="email" placeholder="your@email.com"></div>
                <div class="form-group"><label>{vehicle_label}</label><input type="text" required placeholder="{vehicle_placeholder}"></div>
                <div class="form-group">
                    <label>Service *</label>
                    <select required>
                        <option value="">Select a service...</option>
{options}
                    </select>
                </div>
                <div class="form-group"><label>Preferred Date</label><input type="date"></div>
                <div class="form-group"><label>Message</label><textarea rows="3" placeholder="Any special requests or notes..."></textarea></div>
                <button type="submit" class="form-submit">Submit Booking Request</button>
                {FOOTER_NOTE}
            </form>
        </div>
    </div>

{SCRIPTS}'''

# --- motorcycle-services.html ---
moto_modal = make_modal(
    title="Book Your Motorcycle Detail",
    vehicle_label="Motorcycle (Year, Make, Model) *",
    vehicle_placeholder="e.g. 2022 Harley-Davidson Street Glide",
    services=[
        "Road Ready Detail ($85\u2013$105)",
        "Chrome & Shine Detail ($145\u2013$185)",
        "Show Bike Detail ($245\u2013$295)",
        "Seasonal Prep Detail ($125\u2013$155)",
        "Custom / Other"
    ]
)

# --- under-the-hood.html ---
uth_modal = make_modal(
    title="Book Under the Hood Service",
    vehicle_label="Vehicle (Year, Make, Model) *",
    vehicle_placeholder="e.g. 2019 Ford F-150",
    services=[
        "Oil Change \u2014 Conventional ($45)",
        "Oil Change \u2014 Synthetic Blend ($60)",
        "Oil Change \u2014 Full Synthetic ($80)",
        "Oil Change \u2014 High-Mileage ($90)",
        "Oil Change \u2014 Diesel ($110)",
        "Transmission Fluid Exchange ($110)",
        "Coolant / Antifreeze Flush ($95)",
        "Power Steering Fluid Flush ($75)",
        "Brake Fluid Flush ($75)",
        "Brake Pad Replacement \u2014 Front ($130)",
        "Brake Pad Replacement \u2014 Rear ($130)",
        "Brake Pad + Rotor Replacement ($245)",
        "Tire Rotation ($30)",
        "Battery Replacement \u2014 Standard ($105)",
        "Battery Replacement \u2014 AGM / Premium ($195)",
        "Engine Bay Detail ($65)",
        "Custom / Multiple Services"
    ]
)

fixes = [
    ("motorcycle-services.html", moto_modal),
    ("under-the-hood.html", uth_modal),
]

for filename, new_tail in fixes:
    filepath = os.path.join(os.path.dirname(__file__), filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    cut = content.find("\n    <script src=\"main.js\"")
    if cut == -1:
        print(f"ERROR: anchor not found in {filename}")
        continue

    result = content[:cut] + new_tail
    with open(filepath, "w", encoding="utf-8", newline="\n") as f:
        f.write(result)

    lines = result.count("\n") + 1
    has_modal = 'id="bookingModal"' in result
    has_widget = '<div id="hds-chat-widget"' in result
    html_count = result.count("</html>")
    print(f"{filename}: {lines} lines | modal={has_modal} | inlineWidget={has_widget} | </html> count={html_count}")

print("Done.")
