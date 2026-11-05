// DDJ-FLX2 Custom Mapping for Mixxx
// Focus: Jog Wheels and Scratching
// Compatible with Mixxx 2.3+
// GitHub Guide: https://github.com/mixxxdj/mixxx/wiki/Midi-Scripting

var FLX2 = {};

FLX2.init = function() {
    // Set vinyl mode to relative (essential for modern controllers)
    engine.setValue("[Channel1]", "vinylcontrol_mode", 1);
    engine.setValue("[Channel2]", "vinylcontrol_mode", 1);
    
    // Initialize jog sensitivity
    this.jogSensitivity = 0.5;
};

// Jog Wheel Handling Functions
FLX2.jog1 = function(channel, control, value, status) {
    this.handleJog(1, value);
};

FLX2.jog2 = function(channel, control, value, status) {
    this.handleJog(2, value);
};

FLX2.handleJog = function(deck, value) {
    // Convert to relative movement value (-1.0 to 1.0)
    var movement = this.convertJogValue(value);
    var group = "[Channel" + deck + "]";
    
    // Apply sensitivity scaling
    movement *= this.jogSensitivity;
    
    if (engine.getValue(group, "vinylcontrol_enable")) {
        // Scratching mode - use direct jog control
        engine.setValue(group, "jog", movement);
    } else {
        // Seeking mode - use scratch for faster navigation
        engine.setValue(group, "jog", movement * 3);
    }
};

// Convert FLX2 jog messages to relative movement
FLX2.convertJogValue = function(value) {
    // FLX2 uses signed relative encoding (0x41-0x7F = negative, 0x01-0x3F = positive)
    return (value > 0x40) ? (value - 0x80) / 0x40 : value / 0x40;
};

// Touch Sensors
FLX2.touch1 = function(channel, control, value, status) {
    engine.setValue("[Channel1]", "vinylcontrol_enable", value ? 1 : 0);
};

FLX2.touch2 = function(channel, control, value, status) {
    engine.setValue("[Channel2]", "vinylcontrol_enable", value ? 1 : 0);
};

// Shutdown cleanup
FLX2.shutdown = function() {
    engine.setValue("[Channel1]", "vinylcontrol_enable", 0);
    engine.setValue("[Channel2]", "vinylcontrol_enable", 0);
};
