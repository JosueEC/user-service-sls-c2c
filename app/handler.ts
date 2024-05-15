/**
 * Para poder hacer uso de la inyeccion de dependencias es necesario importar
 * el modulo de reflect-metadata en nuestro archivo handler en combinacion
 * con tsyringe
 */
import "reflect-metadata";
/**
    * La practica recomendada es que la logica de negocio sea creada a parte,
    * osea, que esta no se definida dentro de la funcion Lambda. En realidad
    * la funcion solo se encargar de recibir el evento/peticion,
    * redireccionarla hacia donde corresponde y devolver lo que sea que
    * devuelva la funcion/logica llamda
 */

export * from './handlers/user.handler';