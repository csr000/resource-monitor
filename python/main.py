import PySimpleGUI as sg
import psutil


# build layout
sg.theme("DarkAmber")
sg.set_options(element_padding=(0, 0))
layout = [
    [
        sg.Column([[sg.Text("CPU", font=("Helvetica", 8))], [sg.Text("-", key="CPU")]]),
        sg.Column([[sg.Text("RAM", font=("Helvetica", 8))], [sg.Text("-", key="RAM")]]),
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
    window["CPU"].update(int(psutil.cpu_percent()))
    window["RAM"].update(int(psutil.virtual_memory().percent))
