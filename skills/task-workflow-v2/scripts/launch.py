"""Syntax-check JavaScript checks, then await the unchanged shared verifier."""
import argparse
import signal
import subprocess
import sys
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cwd", default=Path.cwd(), type=Path)
    parser.add_argument("--check", action="append", default=[], type=Path)
    parser.add_argument("runner_args", nargs=argparse.REMAINDER)
    args = parser.parse_args()
    cwd = args.cwd.resolve(strict=True)
    runner_args = args.runner_args
    if runner_args[:1] == ["--"]:
        runner_args = runner_args[1:]
    for script in args.check:
        result = subprocess.run(["node", "--check", str(script)], cwd=cwd)
        if result.returncode:
            print(f"[launch] Syntax preflight failed: {script}; server not started.", file=sys.stderr)
            return result.returncode
    verify = Path(__file__).resolve().with_name("verify.mjs")
    child = subprocess.Popen(["node", str(verify), "--cwd", str(cwd), *runner_args], cwd=cwd)

    def forward_signal(number, _frame):
        if child.poll() is None:
            child.send_signal(number)

    for number in (signal.SIGINT, signal.SIGTERM):
        signal.signal(number, forward_signal)
    return child.wait()


if __name__ == "__main__":
    code = main()
    sys.exit(code if code >= 0 else 128 - code)
