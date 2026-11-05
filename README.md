# How to install the DDJ-FLX2 MIDI mapping on **Linux**:


### **Installation Steps**
#### **1. Copy the mapping files**
Open a terminal and run:
```bash
mkdir -p ~/.mixxx/controllers
cp DDJ-FLX2.midi.xml DDJ-FLX2.midi.js ~/.mixxx/controllers/
```

#### **2. Configure Mixxx**
1. **Launch Mixxx**.
2. Go to **Preferences**/**Controllers**.
3. Click **Add** and select **"Pioneer DDJ-FLX2"** from the controller list.
4. Enable the controller by checking the **"Enabled"** box.
5. Click **OK** to save.

---

### **Verification**
1. **Test the Jog Wheels** by turning each platter.
2. **Check MIDI Input** (Optional):
   - In Mixxx **Preferences** → **Controllers**, enable **"MIDI Debug"**.
   - Verify the jog wheel messages match the control numbers in the XML. Touch sensor inputs are not mapped yet.

---

### **Troubleshooting**
#### **Issue: Jog Wheels Don't Respond**
- **Fix 1**: Ensure the controller is **USB-connected** and recognized:
  ```bash
  lsusb | grep "Pioneer"
  ```
  (Should show the DDJ-FLX2.)
- **Fix 2**: Verify Mixxx has **ALSA/JACK access**:
  ```bash
  groups | grep audio
  ```
  If missing, add your user to the `audio` group:
  ```bash
  sudo usermod -aG audio $USER
  ```
  (Log out and back in.)

#### **Issue: Jog Response Feels Laggy**
- **Adjust sensitivity** in the script:
  ```javascript
  this.jogSensitivity = 0.7; // Increase (0.1–1.0)
  ```
  Save the file and **reload the mapping** in Mixxx.

---

### **Uninstall**
To remove:
1. Delete both mapping files:
   ```bash
   rm ~/.mixxx/controllers/DDJ-FLX2.midi.{xml,js}
   ```
2. Remove the FLX2 entry in Mixxx **Preferences** → **Controllers**.
