use std::io{self, Write};
use termion::{color, style};

pub strct Terminal {
    stdout: io::Stdout,
}

impl Terminal {
    pub fn new() -> Self {
        Self {
            stdout: io::stdout(),
        }
    }

    pub fn print_red(&mut self, text: &str) {
        write!(self.stdout, "{}{}{}", color::Fg(color::Red), text, color::Fg(color::Reset));
    }

    pub fn print_blue(&mut self, text: &str) {
        write!(self.stdout, "{}{}{}", color::Fg(color::Blue), text, color::Fg(color::Reset));
    }

    pub fn print_bold_blue(&mut self, text: &str) {
        write!(self.stdout, "{}{}{}{}{}", style::Bold, color::Fg(color::Blue), text, style::Reset, color::Fg(color::Reset));
    }

    pub fn print_italic(&mut self, text: &str) {
        write!(self.stdout, "{}{}{}", style::Italic, text, style::Reset);
    }

    pub fn write (&mut self, text: &str) -> io::Result<()> {
        write!(self.stdout, "{}", text);
    }
}