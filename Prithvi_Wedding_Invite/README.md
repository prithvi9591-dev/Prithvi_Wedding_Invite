# Prithvi & Aishwarya — Wedding Cinema Interactive Invitation

A 100% replica of the **Wedence Wedding Cinema** interactive invitation website customized with:
1. **Parting Velvet Curtains** on tap + synchronized MP3 background music.
2. **Top Personalized Guest Page** (`Dear Prathamesh, You are cordially invited...`).
3. **Interactive HTML5 Gold Foil Scratch Card** + live countdown to **29 January 2027, 1:00 PM IST**.
4. **Meet the Couple** & **Scroll-Driven Love Story Chapters**.
5. **Wedding Ceremony Only (`Shubh Vivah`)** — Haldi & RSVP removed as requested.
6. **Automatic Post-Countdown Cutover**: Once the countdown hits `00:00:00:00` (after 29 Jan 2027, 1:00 PM IST), the link automatically transforms into a **single, non-scrollable, audio-free personalized Thank You page** (`Thank You, Prathamesh!`) with falling golden petals in the background.

---

## Quick Start in IntelliJ IDEA (macOS)

1. **Extract the ZIP file** and open the `wedding-cinema-invite` folder in **IntelliJ IDEA**.
2. Open the **Terminal** inside IntelliJ (`Option + F12`) and install the dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Test the personalized links in your browser:
   - **Pre-Wedding Personalized Invite (for Prathamesh):**
     `http://localhost:5173/?g=prathamesh`
   - **Post-Countdown Thank You Page Preview (for Prathamesh):**
     `http://localhost:5173/?g=prathamesh&preview=thankyou`
     *(Note: Adding `&preview=thankyou` lets you preview the post-1:00 PM Jan 29, 2027 screen anytime without changing your Mac's clock!)*

---

## Where to Put Your Images & MP3 Audio File

Drop your files into the `public/` folder using these exact filenames:

- **Background Music MP3:**
  - `public/audio/wedding-theme.mp3`
- **Couple Portraits:**
  - `public/images/couple/groom.jpg`
  - `public/images/couple/bride.jpg`
- **Love Story Chapter Photos:**
  - `public/images/story/chapter-1.jpg`
  - `public/images/story/chapter-2.jpg`
  - `public/images/story/chapter-3.jpg`
- **Swipeable Gallery Photos:**
  - `public/images/gallery/photo-1.jpg`
  - `public/images/gallery/photo-2.jpg`
  - `public/images/gallery/photo-3.jpg`
  - `public/images/gallery/photo-4.jpg`
  - `public/images/gallery/photo-5.jpg`
- **WhatsApp Link Share Thumbnail:**
  - `public/images/og-preview.jpg`

---

## Generating Dynamic Guest Links with Java

1. Open `guest-generator/guests-input.csv` and add your guests (one per line):
   ```csv
   Prathamesh,Dear Prathamesh,We are so excited to celebrate our special day with you!
   ```
2. Run `guest-generator/GuestGenerator.java` directly in IntelliJ (right-click -> **Run 'GuestGenerator.main()'**) or via terminal:
   ```bash
   java guest-generator/GuestGenerator.java
   ```
3. This automatically updates `public/guests.json` and writes all personalized links into `guest-generator/whatsapp-links.txt`.
