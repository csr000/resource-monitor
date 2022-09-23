import PySimpleGUI as sg
import psutil


def scheme(ram="-", cpu="-"):
    return f"{ram} {cpu}"


# build layout
sg.theme("DarkAmber")
sg.set_options(element_padding=(0, 0))
layout = [
    [
        sg.Text("RAM", justification="center", font=("Helvetica", 8)),
        sg.Text("CPU", justification="center", font=("Helvetica", 8)),
    ],
    [
        sg.Text("-", justification="center", key="RAM"),
        sg.Text("-", justification="center", key="CPU"),
    ],
]

# create window
window = sg.Window(
    "Resource monitor",
    layout,
    no_titlebar=True,
    auto_size_buttons=False,
    keep_on_top=True,
    grab_anywhere=True,
    alpha_channel=0.7,
)

while True:  # Event Loop
    event, values = window.read(timeout=1000)
    window["RAM"].update(int(psutil.virtual_memory().percent))
    window["CPU"].update(int(psutil.cpu_percent()))
