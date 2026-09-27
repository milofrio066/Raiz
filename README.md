# Raíz · Tu trabajo cuenta. Hazlo visible.

## Abrir la demo

Haz doble clic en **ABRIR-RAIZ.cmd** o abre **index.html** con Chrome o Edge. No requiere instalar dependencias. Mantén todos los archivos de esta carpeta juntos.

Para la persistencia más consistente entre ambas interfaces, si tienes Node.js ejecuta `npm start` desde esta carpeta y abre http://localhost:4173. La vista del asesor está en http://localhost:4173/entidad.html. Se incluye un servidor local sin dependencias. El servidor solo escucha en este equipo.

Los navegadores pueden restringir el almacenamiento de páginas abiertas directamente como archivo. Si no aparecen perfiles entre las dos interfaces, usa el servidor local. Usa siempre el mismo navegador y la misma dirección; los datos no se comparten entre dispositivos, rutas de origen distintas ni modo privado.

## Recorrido de tres minutos

1. En inicio, selecciona **Explorar un ejemplo**: abre el pasaporte ficticio «La esquina de Elena».
2. Mira las cuatro dimensiones y **Ver cómo se calcula**. Usa **Completar evidencias** para abrir archivos, cambiar sus datos y confirmar de nuevo. El CSV incluido sirve para probar una carga real.
3. En el pasaporte, marca la autorización y pulsa **Autorizar acceso a mi pasaporte**.
4. Abre **Soy una entidad**. Entra al perfil autorizado y explora resumen, evidencias, puntos por aclarar y trazabilidad. Cambia el estado de revisión del asesor.
5. Retira el acceso desde el pasaporte: el perfil deja de aparecer a la entidad. **Mis perfiles → Crear perfil** permite mostrar el registro autónomo con respuestas cerradas.

## Qué funciona

- Registro por pasos con selección cerrada, consentimiento, varios perfiles y caso ficticio.
- Carga real mediante selector o arrastre (PDF, JPG, PNG, WebP, TXT y CSV; 10 MB por archivo, 40 por perfil). Archivos en IndexedDB y metadatos en almacenamiento local.
- Vista previa de imágenes y PDF según soporte del navegador, texto de TXT/CSV, descarga y eliminación.
- Sugerencia de categoría por palabras del nombre; corrección manual, datos estructurados y confirmación. Un CSV de exactamente una fila de datos con cabecera `mes,ingresos,gastos` permite proponer valores. El usuario debe confirmarlos. Otros CSV muestran texto para entrada manual. No hay OCR ni lectura automática de PDF o imágenes.
- Detección de cargas repetidas por huella de archivo cuando está disponible; cruces por mes, diferencias entre fuentes, gastos mayores que ingresos y fechas futuras.
- Motor determinista PIS/EC v0.1, explicaciones y componentes pendientes si falta evidencia. Reglas de cada componente documentadas dentro de la aplicación.
- Asistente contextual de reglas locales, sin LLM ni servicios externos. PIS no es probabilidad de impago. EC no verifica autenticidad.
- Vista institucional separada, consentimiento revocable y seguimiento del asesor. Impresión del pasaporte mediante el diálogo del navegador.

## Límites explícitos

Es una demo local, sin autenticación, servidor de datos ni envío a una entidad real. La separación visual y el consentimiento no son controles de seguridad: cualquiera con acceso al navegador puede inspeccionar o modificar los datos. No usar documentos sensibles. Limpiar los datos del navegador elimina perfiles y archivos. El registro de acciones no es una auditoría inmutable.

Las reglas internas de las dimensiones son supuestos de demostración, no un modelo validado con datos de pago. V mide confirmación del usuario, no verificación independiente. La diversidad documental afecta la cobertura, no la inferencia de riesgo. Sin cuenta bancaria ni local físico no hay penalización. Nunca se usan atributos sensibles, ubicación o contactos. Para fuentes del mismo mes se usan máximos de ingresos y gastos sin sumarlos; los solapamientos requieren revisión humana. La entidad conserva la decisión crediticia.

La aplicación funciona sin internet. Las tipografías de Google son opcionales y tienen alternativas locales. Logo e ilustración originales en SVG; no requieren imágenes externas.

## Archivos

`index.html`: comerciante. `entidad.html`: asesor. `app.js`: interacción y persistencia. `model.js`: cálculo. `styles.css`: diseño responsive. `logo.svg`: marca. `server.cjs`: servidor opcional. `test-model.cjs`: pruebas del cálculo (`npm test`).
