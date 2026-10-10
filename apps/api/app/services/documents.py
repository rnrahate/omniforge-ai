from dataclasses import dataclass
from pathlib import PurePath


ALLOWED_DOCUMENT_TYPES = {
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
MAX_DOCUMENT_BYTES = 10 * 1024 * 1024


@dataclass(frozen=True)
class DocumentMetadata:
    filename: str
    content_type: str
    size_bytes: int


class DocumentValidationError(ValueError):
    pass


def validate_document(metadata: DocumentMetadata) -> None:
    """Validate upload metadata before private Storage persistence or extraction."""
    filename = PurePath(metadata.filename).name
    if not filename or filename != metadata.filename or filename in {".", ".."}:
        raise DocumentValidationError("Document filename is invalid.")
    if metadata.content_type not in ALLOWED_DOCUMENT_TYPES:
        raise DocumentValidationError("Document type is not supported.")
    if not 0 < metadata.size_bytes <= MAX_DOCUMENT_BYTES:
        raise DocumentValidationError("Document size is outside the allowed range.")
