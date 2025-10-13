/**
 * ===================================================================================
 * BLOG POSTS DATA
 * ===================================================================================
 * Este archivo actúa como una base de datos estática para las entradas del blog.
 * Para añadir una nueva entrada, simplemente copia un objeto y pégalo al principio
 * del array 'blogPosts', luego modifica su contenido.
 * -----------------------------------------------------------------------------------
 */

const blogPosts = [
    {
        // 'slug' debe ser una cadena única sin espacios. Se usa como identificador.
        slug: 'por-que-elegir-dotnet',
        // 'title' es el título principal de tu artículo.
        title: 'Por qué elegí .NET para mi API transaccional',
        // 'date' es la fecha de publicación.
        date: '13 de Octubre, 2025',
        // 'excerpt' es un resumen corto que aparecerá en la tarjeta del blog.
        excerpt: 'Una reflexión sobre las decisiones arquitectónicas detrás de mi proyecto de gestión de pedidos y por qué la robustez de .NET y SQL fue la elección correcta.',
        // 'content' es el cuerpo completo del artículo. Puedes usar etiquetas HTML aquí.
        content: `
            <h2>La Importancia de la Decisión Correcta</h2>
            <p>Cuando comencé a diseñar la API para el sistema de gestión de pedidos, la prioridad número uno era la <strong>confiabilidad</strong>. Necesitaba garantizar que cada operación fuera atómica y que la integridad de los datos nunca se viera comprometida. Esto me llevó a una conclusión clara: necesitaba un ecosistema que tratara las transacciones ACID como un ciudadano de primera clase.</p>
            
            <h2>Entra en Escena .NET y SQL Server</h2>
            <p>Aquí es donde C# con ASP.NET Core brilló. El framework está diseñado para aplicaciones empresariales robustas. La integración con Entity Framework Core permitió un mapeo objeto-relacional (ORM) limpio y, lo más importante, un manejo de transacciones muy explícito y controlable.</p>
            
            <p>Un ejemplo claro es cómo se maneja la creación de un pedido:</p>
            <pre><code>using (var transaction = _context.Database.BeginTransaction())
{
    try
    {
        // 1. Actualizar el inventario del producto
        var product = _context.Products.Find(order.ProductId);
        product.Stock--;

        // 2. Crear el registro del pedido
        _context.Orders.Add(order);
        
        // 3. Guardar todos los cambios a la vez
        _context.SaveChanges();

        // Si todo va bien, confirmar la transacción
        transaction.Commit();
    }
    catch (Exception)
    {
        // Si algo falla en cualquier punto, revertir todo
        transaction.Rollback();
        throw; // Relanzar la excepción
    }
}</code></pre>
            <p>Este nivel de control, garantizando que una operación o se completa en su totalidad o no se realiza en absoluto, es fundamental para una aplicación donde la consistencia de los datos es crítica.</p>
        `
    },
    {
        slug: 'retos-con-mongodb',
        title: 'El Reto de los Datos Anidados en MongoDB con Mongoose',
        date: '05 de Octubre, 2025',
        excerpt: 'Mongoose es una herramienta fantástica, pero poblar datos relacionados de manera eficiente requiere una buena estrategia. Aquí explico cómo abordé el problema...',
        content: `
            <h2>El Problema: ¿Referencias o Documentos Embebidos?</h2>
            <p>En mi API para el blog, un <strong>Post</strong> puede tener muchos <strong>Comentarios</strong>, y cada Comentario pertenece a un <strong>Usuario</strong>. La primera pregunta fue: ¿embebemos los comentarios dentro del documento del post o los guardamos en una colección separada y usamos referencias?</p>
            <p>Embeber es rápido para leer, pero si un post se vuelve viral y tiene miles de comentarios, el documento del post podría crecer demasiado (límite de 16MB en MongoDB). Por lo tanto, opté por usar <strong>referencias</strong>, que es un enfoque más escalable.</p>
            
            <h2>La Solución con .populate()</h2>
            <p>Guardé solo los `ObjectId` de los comentarios en un array dentro del documento del post. Luego, para traer el post junto con sus comentarios y los autores de esos comentarios, usé el método <code>.populate()</code> de Mongoose de forma anidada.</p>
            <pre><code>// Encontrar un post y popular sus comentarios
// Y para cada comentario, popular la información del autor
const post = await Post.findById(postId)
    .populate({
        path: 'comments',
        populate: {
            path: 'author',
            model: 'User',
            select: 'username' // Solo traer el nombre de usuario
        }
    });</code></pre>
            <p>Esta técnica me permitió mantener los documentos pequeños y manejables, mientras seguía obteniendo todos los datos necesarios en una sola consulta eficiente a la base de datos.</p>
        `
    }
];