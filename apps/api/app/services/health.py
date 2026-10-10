from app.schemas.health import HealthResponse


def get_health() -> HealthResponse:
    """Return liveness for this process without reporting unconfigured future services."""
    return HealthResponse(status="ok", service="omniforge-api")
