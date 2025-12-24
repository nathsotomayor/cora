/**
 * INSTANTES COTIDIANOS
 * Storytelling basado en "Quiero hacer contigo" de Elvira Sastre
 *
 * El poema se presenta verso por verso como una narrativa visual inmersiva.
 * Cada sección del poema está acompañada por una imagen temática que
 * refuerza la emoción y el mensaje de esos versos.
 *
 * Autora: Elvira Sastre
 * Poema: "Quiero hacer contigo todo lo que la poesía aún no ha escrito"
 * Libro: "43 Maneras de Soltarse el Pelo"
 */

const FALLBACK_QUOTES = [
    // SECCIÓN 1: LA APARICIÓN
    {
        id: "verso_01",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Cualquiera diría al verte
que los catastrofistas fallaron:
no era el fin del mundo lo que venía,
eras tú.`
    },

    // SECCIÓN 2: LA LLEGADA
    {
        id: "verso_02",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Te veo venir por el pasillo
como quien camina dos centímetros por encima del aire
pensando que nadie le ve.`
    },

    // SECCIÓN 3: LA ENTRADA
    {
        id: "verso_03",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Entras en mi casa
—en mi vida—
con las cartas y el ombligo boca arriba,
con los brazos abiertos`
    },

    // SECCIÓN 4: LA OFRENDA
    {
        id: "verso_04",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `como si esta noche
me ofrecieras barra libre de poesía en tu pecho,
con las manos tan llenas de tanto
que me haces sentir que es el mundo el que me toca`
    },

    // SECCIÓN 5: LA TRANSFORMACIÓN
    {
        id: "verso_05",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: "y no la chica más guapa del barrio."
    },

    // SECCIÓN 6: EL ASIENTO
    {
        id: "verso_06",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Te sientas
y lo primero que haces es avisarme:
No llevo ropa interior
pero a mi piel le viste una armadura.`
    },

    // SECCIÓN 7: LA RESPUESTA
    {
        id: "verso_07",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Te miro
y te contesto:
Me gustan tanto los hoy
como miedo me dan los mañana.`
    },

    // SECCIÓN 8: EL PRIMER BESO
    {
        id: "verso_08",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Y yo sonrío
y te beso la espalda
y te empaño los párpados
y tu escudo termina donde terminan las protecciones:
arrugado en el cubo de la basura.`
    },

    // SECCIÓN 9: LA RECIPROCIDAD
    {
        id: "verso_09",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Y tú sonríes
y descubres el hormigueo de mi espalda
y me dices que una vida sin valentía
es un infinito camino de vuelta,`
    },

    // SECCIÓN 10: LA VALENTÍA
    {
        id: "verso_10",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `y mi miedo se quita las bragas
y se lanza a bailar con todos los semáforos en rojo.`
    },

    // SECCIÓN 11: EL TIEMPO
    {
        id: "verso_11",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Beso
uno a uno
todos los segundos que te quedas en mi cama
para tener al reloj de nuestra parte;`
    },

    // SECCIÓN 12: LAS DESPEDIDAS
    {
        id: "verso_12",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `hacemos de las despedidas
media vuelta al mundo
para que aunque tardemos
queramos volver;`
    },

    // SECCIÓN 13: LA DUALIDAD
    {
        id: "verso_13",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `entras y sales siendo cualquiera
pero por dentro eres la única;`
    },

    // SECCIÓN 14: LA LIBERTAD
    {
        id: "verso_14",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `te gusta mi libertad
y a mí me gusta sentirme libre a tu lado;
me gusta tu verdad
y a ti te gusta volverte cierta a mi lado.`
    },

    // SECCIÓN 15: LA BELLEZA
    {
        id: "verso_15",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Tienes el pelo más bonito del mundo
para colgarme de él hasta el invierno que viene;`
    },

    // SECCIÓN 16: LA MIRADA
    {
        id: "verso_16",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `gastas unos ojos que hablan mejor que tu boca
y una boca que me mira mejor que tus ojos;`
    },

    // SECCIÓN 17: EL DESPERTAR
    {
        id: "verso_17",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `guardas un despertar que alumbra las paredes
antes que la propia luz del sol;`
    },

    // SECCIÓN 18: LA RISA
    {
        id: "verso_18",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `posees una risa capaz de rescatar al país
y la mirada de los que saben soñar con los ojos abiertos.`
    },

    // SECCIÓN 19: LA REVELACIÓN
    {
        id: "verso_19",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Y de repente pasa,
sin esperarlo ha pasado.
No te has ido y ya te echo de menos,`
    },

    // SECCIÓN 20: EL DESEO
    {
        id: "verso_20",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `te acabo de besar
y mi saliva se multiplica queriendo más,
cruzas la puerta
y ya me relamo los dedos para guardarte,`
    },

    // SECCIÓN 21: LA CIUDAD
    {
        id: "verso_21",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `paseo por <del>Madrid</del> Medellín :)
y te quiero conmigo en cada esquina.`
    },

    // SECCIÓN 22: LA INVITACIÓN FINAL
    {
        id: "verso_22",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Si la palabra es acción
entonces ven a contarme el amor,
que quiero hacer contigo
todo lo que la poesía aún no ha escrito.`
    }
];

/**
 * IMÁGENES TEMÁTICAS PARA CADA VERSO
 * Cada imagen está seleccionada para reflejar la emoción y narrativa del verso correspondiente
 */
const FALLBACK_IMAGES = [
    // IMAGEN 1: La Aparición - Silueta emergiendo
    {
        id: "img_01",
        url: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428",
        alt: "Silueta de persona apareciendo",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1a1a2e"
    },

    // IMAGEN 2: La Llegada - Pasillo con luz
    {
        id: "img_02",
        url: "https://images.unsplash.com/photo-1545231027-637d2f6210f8",
        alt: "Pasillo iluminado",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2a2a3e"
    },

    // IMAGEN 3: La Entrada - Puerta abierta
    {
        id: "img_03",
        url: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7",
        alt: "Puerta abierta con luz",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#3a3a4e"
    },

    // IMAGEN 4: La Ofrenda - Manos abiertas
    {
        id: "img_04",
        url: "https://images.unsplash.com/photo-1532635270-c8dca76c27fe",
        alt: "Manos ofreciendo",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2e2e3e"
    },

    // IMAGEN 5: La Transformación - Rostro femenino
    {
        id: "img_05",
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        alt: "Rostro sereno",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1e1e2e"
    },

    // IMAGEN 6: El Asiento - Espacio íntimo
    {
        id: "img_06",
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
        alt: "Interior cálido",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2a2a3a"
    },

    // IMAGEN 7: La Respuesta - Miradas encontradas
    {
        id: "img_07",
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
        alt: "Mirada profunda",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1a1a2a"
    },

    // IMAGEN 8: El Primer Beso - Intimidad
    {
        id: "img_08",
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
        alt: "Cercanía íntima",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2e2e4e"
    },

    // IMAGEN 9: La Reciprocidad - Espalda, piel
    {
        id: "img_09",
        url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
        alt: "Espalda delicada",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#3a3a5e"
    },

    // IMAGEN 10: La Valentía - Semáforos, rojo
    {
        id: "img_10",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
        alt: "Luces rojas nocturnas",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#4a4a6e"
    },

    // IMAGEN 11: El Tiempo - Reloj, tiempo
    {
        id: "img_11",
        url: "https://images.unsplash.com/photo-1501139083538-0139583c060f",
        alt: "Reloj antiguo",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2a2a4a"
    },

    // IMAGEN 12: Las Despedidas - Camino, vuelta
    {
        id: "img_12",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        alt: "Camino que da vuelta",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1a1a1a"
    },

    // IMAGEN 13: La Dualidad - Dos en uno
    {
        id: "img_13",
        url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
        alt: "Dualidad visual",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#3e3e4e"
    },

    // IMAGEN 14: La Libertad - Espacio abierto
    {
        id: "img_14",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        alt: "Libertad y espacio",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#4a4a5a"
    },

    // IMAGEN 15: La Belleza - Pelo, cabello
    {
        id: "img_15",
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
        alt: "Cabello hermoso",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#0a0a1a"
    },

    // IMAGEN 16: La Mirada - Ojos expresivos
    {
        id: "img_16",
        url: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862",
        alt: "Ojos que hablan",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2a2a3e"
    },

    // IMAGEN 17: El Despertar - Luz del amanecer
    {
        id: "img_17",
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
        alt: "Amanecer en habitación",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#3a3a4e"
    },

    // IMAGEN 18: La Risa - Alegría, sonrisa
    {
        id: "img_18",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        alt: "Risa genuina",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2e2e3e"
    },

    // IMAGEN 19: La Revelación - Momento de sorpresa
    {
        id: "img_19",
        url: "https://images.unsplash.com/photo-1509909756405-be0199881695",
        alt: "Momento revelador",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1e1e2e"
    },

    // IMAGEN 20: El Deseo - Labios, beso
    {
        id: "img_20",
        url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5",
        alt: "Labios sensuales",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2a2a3a"
    },

    // IMAGEN 21: La Ciudad - Madrid, calle
    {
        id: "img_21",
        url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
        alt: "Calles de Madrid",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#1a1a2a"
    },

    // IMAGEN 22: La Invitación Final - Escritura, poesía
    {
        id: "img_22",
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
        alt: "Escritura poética",
        photographer: "Unsplash",
        photographerUrl: "#",
        color: "#2e2e4e"
    }
];

// Exportar para uso en el módulo principal
// (En caso de usar módulos ES6, descomentar las líneas siguientes)
// export { FALLBACK_QUOTES, FALLBACK_IMAGES };
