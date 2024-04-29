from pathlib import Path
import sys

app_dir = Path(__file__).resolve().parent.parent / "app"
sys.path.insert(0, str(app_dir))
