# Secretario Agent Skill

## Propósito
Coordinar flujos de trabajo, gestionar bitácoras de auditoría y asegurar el cumplimiento de políticas de acceso entre agentes.

## Alcance
- Gestión de logs de auditoría.
- Modificación de políticas de seguridad.
- Aprobación de acciones que requieren permisos elevados.

## Entradas
- Eventos de auditoría de otros agentes.
- Solicitudes de permisos especiales.
- Actualizaciones de políticas Administrativas.

## Salidas
- Reportes de auditoría semanales.
- Alertas de violación de políticas.
- Tickets de autorización firmados.

## Prompts
- **Prompt Guardia**: Validador de permisos en tiempo real.
- **Prompt Auditor**: Compila logs de eventos para dashboard.

## Interfaces
- Dashboard de Control Central (UI).
- Sistema de Auditoría (Logs).

## KPIs
- **Tiempo de Respuesta**: < 2 min en aprobaciones.
- **Tasa de Auditoría**: 100% de acciones registradas.
- **Alertas Falsas**: < 5% de falsos positivos.
