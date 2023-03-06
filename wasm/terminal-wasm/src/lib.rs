
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fun main() {
    let mut terminal = Terminal::new();
    terminal.print_red("Hello, world!");
    terminal.print_blue("Hello, world!");
    terminal.print_bold_blue("Hello, world!");
    terminal.print_italic("Hello, world!");
    terminal.write("Hello, world!");
   
}
