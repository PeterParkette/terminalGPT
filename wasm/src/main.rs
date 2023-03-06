use wezterm::{config::Config, start};

fn main() {
    // Load the terminal configuration from a file or create one programmatically
    let config = Config::default();

    // Start the terminal emulator
    start(config, None).unwrap();
}