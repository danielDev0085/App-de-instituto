//----VARIABLES GLOBALES----
let message=document.getElementById("message"); //Párrafo para mensajes
let olList=document.querySelector("ol"); //Elemento padre de la lista
let firsItemList=olList.firstElementChild; //Primer hijo de la lista
let itemsLi=olList.getElementsByTagName("li"); //Conjunto de elementos de la lista
let iterator=0 //Iterador
let next=false; //Booleano para saber si hemos dado por primera vez a next.

//----AÑADIR ESTUDIANTES----
function addStudent(){
    message.innerHTML=""; //Borrar párrafo mensajes.

    //Obtenemos los datos del formulario
    let name=document.getElementById("name").value;
    let age=document.getElementById("age").value;
    let course=document.getElementById("course").value;

    if (name!=="" && age!=="" && age>15 && age<100 && course!=="") {
        
        //Creo elemento hijo.
        let itemList=document.createElement("LI");

        //Asigno atributos y agrego elemento hijo
        itemList.setAttribute("name", name);
        itemList.setAttribute("age", age);
        itemList.setAttribute("course", course);

        olList.appendChild(itemList);
        
        //Asigno el texto al elemento de la lista
        itemList.innerHTML=`Student: ${name}<br>
                            Age: ${age}<br>
                            Course: ${course}<br><hr>`;
    }else{
        message.innerHTML="Rellene correctamente todos los campos";
    }

    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("course").value="";
}

//----ELIMINAR PRIMER ALUMNO DE LA LISTA----
function removeFirstStudent() {
    message.innerHTML="";

    //Selecciono elemento hijo y elimino
    let firsItemList=olList.firstElementChild;

    if(firsItemList){
    firsItemList.remove();

    //Mensaje de conformación 
    message.innerHTML="Registro eliminado";
    }else{
        message.innerHTML="No hay registros que eliminar";
    }
}


//----(COMÚN PARA NEXT Y PREVIOUS) REINICIAR COLORES DEL BACKGROUND Y REASIGNARLOS A ELEMENTOS DE LA LISTA----
function colourAsign() {
    message.innerHTML="";

     for (let i=0; i<itemsLi.length; i++) {
        itemsLi[i].style.backgroundColor="" 
    }

    //Item de la lista seleccionado
    if(iterator<itemsLi.length){
        let selectItemList=itemsLi[iterator];
        selectItemList.style.backgroundColor="#EBE3D5";
    }

    //Item siguiente
    if(iterator<itemsLi.length-1){
        itemsLi[iterator].nextElementSibling.style.backgroundColor="#F2FFE9";
    }
    
    //Item anterior
    if(iterator>0 && iterator<itemsLi.length){
        itemsLi[iterator].previousElementSibling.style.backgroundColor="#B0A695";
    }
}

//----BOTÓN SIGUIENTE----
function nextNav() {
    //Vaciar mensaje
    message.innerHTML="";
    
    //Para saber si se ha ejecutado antes el botón next. Sino no hacemos el incremento antes de aplicar colores
    if(next == true){
        if(iterator<itemsLi.length-1){//Comprobar que no es el último elemento li
            iterator++;
            if(iterator>=0 && iterator<itemsLi.length){//Comprobar que el elemento existe para aplicar colores
                colourAsign();
            } 
        }
    }else{ //Aplicamos color sin realizar incremento anterior
        if(iterator>=0 && iterator<itemsLi.length){
            colourAsign();
        } 
    }
    next=true;
}

//----BOTÓN ANTERIOR----
function previousNav() {
    message.innerHTML="";
    
    if(iterator>0){ //Comprobar que el iterador no se ponga en negativo
        iterator--;
        if(iterator>=0 && iterator<itemsLi.length){ //Si existe el elemento aplica los colores
            colourAsign();
        }
    }
}

/*----ELIMINAR ALUMNOS A TRAVÉS DE DATOS DEL FORMULARIO----
Función extra porque ya la tenía casi hecha cuando me di cuenta de que el enunciado era otro*/
function removeStudentForm() {
    message.innerHTML="";

    //Obtener los datos del formulario
    let name=document.getElementById("name").value;
    let age=document.getElementById("age").value;
    let course=document.getElementById("course").value;
    let eliminado=false;

    if(olList.firstElementChild){
        if (eliminado==false){

            for (let i=0; i<itemsLi.length; i++) {
                //Obtener valor de atributos
                let attribName=itemsLi[i].getAttribute("name");
                let attribAge=itemsLi[i].getAttribute("age");
                let attribCourse=itemsLi[i].getAttribute("course");

                //Comprobar atributos con los datos de los inputs y eliminar elemento
                if (attribName==name && attribAge==age && attribCourse==course) {
                    olList.removeChild(itemsLi[i]);
                    eliminado=true;
                }else{
                    message.innerHTML="Los datos introducidos no coinciden con ningún alumno o alumna";
                }
            }
        }
    }else{
        message.innerHTML="No hay registros que eliminar";
    }
}