# toolbox_text
Technical Test for Toolbox

REQUIREMENTS

1 – Suponga que usted debe realizar una API que se conecta con servicios de terceros para suplir funciones
de control de inventario. Roberto Mansilla, el gerente del proyecto, le solicita a usted que el API supla 3
funciones:
1 – Alta de usuario: Que además debe registrar el usuario en un servicio de terceros en
http://serviciodetercero.com/connect/upload
2 – Consultar producto: Que a su vez consultará en http://serviciodetercero.com/getProduct
Se manejan los siguientes códigos de errores en el API del tercero.
- PD-001: Si el producto no existe.
- PD-002: Si el producto existe pero está reservado.
- PD-003: Si el producto existe pero está agotado.
3 – Cargar producto: Que a su vez consultará en http://serviciodetercero.com/upload/product
Se manejan los siguientes códigos de estado en el API del tercero.
- 200: Si el producto se cargó.
- 403/401: Si fallo la transacción.
Se pide:
1 – Desarrollar un DSS incluyendo todas las transacciones que suceden en el flujo.
2 – Documentar dicha integración (en máximo 3 hojas).
2- Desarrollar en el lenguaje que prefiera un formulario de inicio de sesión (con 2 usuarios de pruebas) en
donde, una vez logueado, si el usuario es valido deberá presentar una pantalla durante dos 2 segundos
con el siguiente formato:
hola + NOMBRE DE USUARIO
y luego deberá redirigir a https://dummy.tbxnet.com con el parámetro username en la URL, de lo
contrario debe indicar el error.
3- Desarrolle una función en el lenguaje que prefiera que, dada una IP, un puerto y un booleano se conecte
a una base de datos en mongodb o una base de datos en sql.
NOTA: si la variable booleana está en true significa que se quiere conectar a una base de datos en
mongodb, de lo contrario se quiere conectar a una base de datos sql
Firma de la funcion: connectBd(ip,port,isMongoConnection)
