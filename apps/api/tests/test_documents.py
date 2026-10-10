import pytest

from app.services.documents import DocumentMetadata, DocumentValidationError, validate_document


def test_document_metadata_accepts_a_small_pdf() -> None:
    validate_document(DocumentMetadata("brand-guide.pdf", "application/pdf", 1024))


@pytest.mark.parametrize(
    "metadata",
    [
        DocumentMetadata("../secrets.pdf", "application/pdf", 1024),
        DocumentMetadata("brief.exe", "application/octet-stream", 1024),
        DocumentMetadata("large.pdf", "application/pdf", 11 * 1024 * 1024),
    ],
)
def test_document_metadata_rejects_unsafe_values(metadata: DocumentMetadata) -> None:
    with pytest.raises(DocumentValidationError):
        validate_document(metadata)
