/**
 * ===================================================================================
 * BLOG POSTS DATA
 * ===================================================================================
 */

const blogPosts = [
    {
        slug: 'por-que-elegir-dotnet',
        title: 'Por qué elegí .NET para mi API transaccional',
        date: '13 de Octubre, 2025',
        excerpt: 'Una reflexión sobre las decisiones arquitectónicas detrás de mi proyecto de gestión de pedidos y por qué la robustez de .NET y SQL fue la elección correcta.',
        content: `
            <h2>La Importancia de la Decisión Correcta</h2>
            <p>Cuando comencé a diseñar la API para el sistema de gestión de pedidos, la prioridad número uno era la <strong>confiabilidad</strong>. Necesitaba garantizar que cada operación fuera atómica y que la integridad de los datos nunca se viera comprometida. Esto me llevó a una conclusión clara: necesitaba un ecosistema que tratara las transacciones ACID como un ciudadano de primera clase.</p>
            
            <h2>Entra en Escena .NET y SQL Server</h2>
            <p>Aquí es donde C# con ASP.NET Core brilló. El framework está diseñado para aplicaciones empresariales robustas. La integración con Entity Framework Core permitió un mapeo objeto-relacional (ORM) limpio y, lo más importante, un manejo de transacciones muy explícito y controlable.</p>
            
            <pre><code>... (código de ejemplo) ...</code></pre>
            <p>Este nivel de control es fundamental para una aplicación donde la consistencia de los datos es crítica.</p>
        `
    },
    {
        slug: 'retos-con-mongodb',
        title: 'El Reto de los Datos Anidados en MongoDB con Mongoose',
        date: '05 de Octubre, 2025',
        excerpt: 'Mongoose es una herramienta fantástica, pero poblar datos relacionados de manera eficiente requiere una buena estrategia. Aquí explico cómo abordé el problema...',
        content: `
            <h2>El Problema: ¿Referencias o Documentos Embebidos?</h2>
            <p>En mi API para el blog, un <strong>Post</strong> puede tener muchos <strong>Comentarios</strong>... opté por usar <strong>referencias</strong>, que es un enfoque más escalable.</p>
            
            <h2>La Solución con .populate()</h2>
            <p>Guardé solo los `ObjectId` de los comentarios... y usé el método <code>.populate()</code> de Mongoose de forma anidada.</p>
            <pre><code>... (código de ejemplo) ...</code></pre>
            <p>Esta técnica me permitió mantener los documentos pequeños y manejables...</p>
        `
    }
];