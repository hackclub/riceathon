# Installing additional packages

In this guide, I have chosen to install base Arch Linux. The following guide will assume that you are using Arch, but any Arch derivative should be able to follow the following guides too.

Also, a reminder that I have opinions, so these packages may not be the best for you :3

You can find alternatives [here](https://github.com/rcalixte/awesome-wayland), [here](https://wiki.archlinux.org/title/Common_Applications/) and just searching!

> [!IMPORTANT]
> Note: Commands prefixed with `#` should be run as root, and those prefixed with `$` should be run unprivileged.
>
> To run something as root, use `sudo <command>`. If for some reason this doesn't work, try `sudo -E <command>` and finally try `su` to get a root shell
>
> Lines prefixed with `//` are comments and should NOT be run.

# Desktop Environment

Well, we have Linux, but all you see is a black console??

We need to install a desktop environment and/or a compositor!

I have opted to use [niri](https://github.com/YaLTeR/niri), why? Because it's written in rust and looks nice :3

```
# sudo pacman -Syu niri xwayland-satellite xdg-desktop-portal-gnome xdg-desktop-portal-gtk
```

See configuration options [here](https://yalter.github.io/niri/)

Note that using a complete desktop environment like KDE plasma or GNOME will make setup much easier, but may restrict what you can rice.

KDE Plasma:

```
# pacman -S plasma
```

Gnome:

```
# pacman -S gnome
```

# Greeter

Without a greeter, you'd have to use the ugly console to log in all the time.

I choose sddm as a greeter.

```
# sudo pacman -S sddm
```

# AUR helper

This simplifies using the AUR a lot!

I choose to use yay:

```
# pacman -S base-devel
$ git clone https://aur.archlinux.org/yay.git
$ cd yay
$ makepkg
# sudo pacman -U yay-12.5.6-1-x86_64.pkg.tar.zst yay-debug-12.5.6-1-x86_64.pkg.tar.zst
```

# File Manager

I persoanlly use thunar, but it isn't very riceable ;-;

```
# pacman -S thunar
```

# Browser

I use zen-browser

```
$ yay -S zen-browser
// or
$ yay -S zen-browser-bin
```

Zen documentation can be found [here](https://docs.zen-browser.app/)

Zen can be riced using userChrome.css!

# Code Editor

I use Zed:

```
# pacman -S zed
```

Zed documentation can be found [here](https://zed.dev/docs/)

If you reallyyyy want to use vscode, see Arch wiki [here](https://wiki.archlinux.org/title/Visual_Studio_Code)

You can find other IDEs/editors [here](https://wiki.archlinux.org/title/List_of_applications/Utilities#Integrated_development_environments)

# Hackatime

With Zed:

1. `Ctrl+Shift+P`
2. Search for `zed: extensions`
3. Search for `wakatime`
4. Install!

# Terminal Emulator

I like kitty, but I've heard that Hack Club is sponsoring ghostty!

```
# pacman -S kitty
// or
# pacman -S ghostty
```

Kitty docs can be found [here](https://sw.kovidgoyal.net/kitty/conf/)

Ghostty docs can be found [here](https://ghostty.org/docs)

# Video Player

mpv is a lightweight video player:

```
# pacman -S mpv
```

if you want, you can install VLC:

```
# pacman -S vlc
```

On Arch, VLC and its plugins are split. I would recommend:

```
# pacman -S vlc-plugins-all
```

# Status Bar

If you like, there are widget frameworks that help you build cool bars and other widgets.

This includes:

- ags (Configured in JavaScript, docs [here](https://aylur.github.io/ags/guide/quick-start.html)) - `$ yay -S aylurs-gtk-shell-git`
- Quickshell (Configured in QML, docs [here](https://quickshell.org/about/)) - `$ yay -S quickshell`
- Fabric (Configured in Python, docs [here](https://wiki.ffpy.org/getting-started/introduction/)) - `$ yay -S python-fabric-git`

If you only want a simple bar, I use waybar:

```
# pacman -S waybar
```

Waybar docs can be found [here](https://github.com/Alexays/Waybar/wiki)

# App Launcher

I use rofi:

```
# pacman -S rofi
```

Rofi docs can be found [here](https://davatorium.github.io/rofi/)

# Clipboard

I use cliphist with wl-clipboard

```
# pacman -S cliphist
```

Docs [here](https://github.com/sentriz/cliphist)

# Screen Locker

I use hyprlock

```
# pacman -S hyprlock
```

hyprlock docs can be found [here](https://wiki.hypr.land/Hypr-Ecosystem/hyprlock/)

# System Monitor

I use btop, it runs in the terminal!

```
# pacman -S btop
```

Docs can be found [here](https://github.com/aristocratos/btop)

# Color Palettes

If you like having color palettes that change with your wallpaper, try `matugen` or `pywal`:

```
$ yay -S matugen
// or
# pacman -S python-pywal
```

Matugen docs can be found [here](https://github.com/InioX/matugen/wiki/Configuration)

# Wallpaper Picker

I use waypaper!

```
# pacman -S waypaper
```

Waypaper docs can be found [here](https://anufrievroman.gitbook.io/waypaper/configuration)

Now that we have a more complete system, reboot and [continue to part 3](../part-3/en-US.md) for the actual ricing!
