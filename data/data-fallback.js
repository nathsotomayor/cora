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
    // SECCIÓN 0: INTRODUCCIÓN
    {
        id: "intro",
        autor: "",
        fuente: "",
        texto: `Ella`
    },

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

    // SECCIÓN 22: LA INVITACIÓN FINAL - PARTE 1
    {
        id: "verso_22_1",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo",
        texto: `Si la palabra es acción
entonces ven a contarme el amor,
que quiero hacer contigo`
    },

    // SECCIÓN 23: LA INVITACIÓN FINAL - PARTE 2
    {
        id: "verso_22_2",
        autor: "Elvira Sastre",
        fuente: "Quiero hacer contigo todo lo que la poesía aún no ha escrito",
        texto: `todo lo que la poesía
aún no ha escrito.`
    }
];

// Exportar para uso en el módulo principal
// (En caso de usar módulos ES6, descomentar la línea siguiente)
// export { FALLBACK_QUOTES };
