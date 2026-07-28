import 'package:flutter/material.dart';

class PortafolioPage extends StatelessWidget {
  const PortafolioPage({super.key});

  @override
  Widget build(BuildContext context) {

    const accentColor = Color(0xFF4DD0E1);

    return Scaffold(

      backgroundColor: const Color.fromARGB(255, 129, 180, 196),

      appBar: AppBar(
        backgroundColor: Colors.transparent,
        title: const Text(
          'Mi Portafolio',
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),


      body: SingleChildScrollView(

        padding: const EdgeInsets.all(20),

        child: Column(

          children: [


            Container(

              padding: const EdgeInsets.all(25),

              decoration: BoxDecoration(

                color: const Color.fromARGB(255, 28, 28, 28),

                borderRadius: BorderRadius.circular(25),

              ),


              child: Column(

                children: [

                  const CircleAvatar(
                    radius: 55,
                    backgroundImage:
                    AssetImage('assets/img/ft.avif'),
                  ),


                  const SizedBox(height: 15),


                  const Text(
                    'Sofia Duran Medina',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 25,
                      fontWeight: FontWeight.bold,
                    ),
                  ),


                  const SizedBox(height: 8),


                  const Text(
                    'Aprendiz SENA\n'
                    'Análisis y Desarrollo de Software',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 16,
                    ),
                  ),

                ],

              ),

            ),


            const SizedBox(height: 20),



            infoCard(
              Icons.person,
              'Sobre mí',
              'Soy aprendiz del SENA apasionada por la tecnología '
              'y el desarrollo de software.',
              accentColor,
            ),


            infoCard(
              Icons.school,
              'Formación',
              'Estudio Análisis y Desarrollo de Software en el SENA.',
              accentColor,
            ),


            infoCard(
              Icons.code,
              'Habilidades',
              'Flutter, Dart, diseño de interfaces, bases de datos '
              'y solución de problemas.',
              accentColor,
            ),


            infoCard(
              Icons.folder,
              'Proyectos',
              'Desarrollo de aplicaciones móviles y proyectos '
              'académicos de software.',
              accentColor,
            ),

          ],

        ),

      ),

    );

  }


  Widget infoCard(
    IconData icon,
    String title,
    String text,
    Color color,
  ) {

    return Container(

      width: double.infinity,

      margin: const EdgeInsets.only(bottom: 15),

      padding: const EdgeInsets.all(18),

      decoration: BoxDecoration(

        color: const Color.fromARGB(255, 28, 28, 28),

        borderRadius: BorderRadius.circular(20),

      ),


      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [


          Row(

            children: [

              Icon(
                icon,
                color: color,
              ),

              const SizedBox(width: 10),


              Text(
                title,
                style: TextStyle(
                  color: color,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),

            ],

          ),


          const SizedBox(height: 10),


          Text(
            text,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 15,
            ),
          ),

        ],

      ),

    );

  }

}