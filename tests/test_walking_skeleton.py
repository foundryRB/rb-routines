"""The walking skeleton's claim, attested.

A claim with no test is not a claim: csd-intent fails an unattested one, and
the shared workflow's conformance job runs that audit, so a scaffold shipping
intent.yaml without this file is red on its own first push. Grow this suite
with the app - the claim is the floor, not the ceiling.
"""

from pathlib import Path

from pytest_intent import intent

_REPO = Path(__file__).resolve().parents[1]


@intent("INT-FOUNDRY-ROUTINES-001")
def test_the_landing_page_is_served_at_the_root_path() -> None:
    page = _REPO / "app" / "index.html"
    assert page.is_file(), "the walking skeleton serves app/index.html"
    assert "<html" in page.read_text(encoding="utf-8").lower()
    # Serving it at / is the image's doing: nginx roots on this exact document,
    # so the claim holds only while the Dockerfile still puts it there.
    dockerfile = (_REPO / "devops" / "Dockerfile").read_text(encoding="utf-8")
    assert "app/index.html" in dockerfile
    assert "/usr/share/nginx/html/index.html" in dockerfile
