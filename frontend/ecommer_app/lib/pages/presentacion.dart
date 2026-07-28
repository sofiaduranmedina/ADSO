import 'package:ecommer_app/pages/sobre%20mi.dart';
import 'package:flutter/material.dart';
import 'package:ecommer_app/pages/contacto.dart';
import 'package:ecommer_app/pages/portafolio.dart';

class PresentationPage extends StatelessWidget {
  const PresentationPage({super.key});

  @override
  Widget build(BuildContext context) {
    const accentColor = Color(0xFF4DD0E1);

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 129, 180, 196),

      appBar: AppBar(
        backgroundColor: const Color.fromARGB(0, 150, 113, 160),
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          'Mi Perfil',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w500,
          ),
        ),
        centerTitle: true,
      ),

      drawer: Drawer(
        child: Container(
          color: const Color.fromARGB(255, 20, 24, 26),
          child: ListView(
            padding: EdgeInsets.zero,
            children: [

              const DrawerHeader(
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 18, 18, 18),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [

                    CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage('assets/img/ft.avif'),
                    ),

                    SizedBox(height: 10),

                    Text(
                      'Sofia Duran',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                  ],
                ),
              ),


              ListTile(
                leading: const Icon(Icons.home, color: accentColor),
                title: const Text(
                  'Inicio',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {
                  Navigator.pop(context);
                },
              ),


             
              ListTile(
                leading: const Icon(Icons.person, color: accentColor),
                title: const Text(
                  'portafolio',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {

                  Navigator.pop(context);

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const PortafolioPage(),
                    ),
                  );

                },
              ),


              ListTile(
                leading: const Icon(Icons.mail, color: accentColor),
                title: const Text(
                  'Contacto',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {

                  Navigator.pop(context);

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const ContactoPage(),
                    ),
                  );

                },
              ),

            ],
          ),
        ),
      ),


      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 20,
              vertical: 10,
            ),

            child: Container(
              padding: const EdgeInsets.all(24),

              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 28, 28, 28),
                borderRadius: BorderRadius.circular(24),

                boxShadow: const [

                  BoxShadow(
                    color: Color.fromARGB(102, 0, 0, 0),
                    blurRadius: 15,
                    offset: Offset(0, 8),
                  ),

                ],
              ),


              child: Column(
                mainAxisSize: MainAxisSize.min,

                children: [

                  Container(
                    decoration: BoxDecoration(

                      shape: BoxShape.circle,

                      border: Border.all(
                        color: accentColor.withValues(alpha: 0.8),
                        width: 3,
                      ),

                      boxShadow: [

                        BoxShadow(
                          color: accentColor.withValues(alpha: 0.3),
                          blurRadius: 12,
                          spreadRadius: 2,
                        ),

                      ],

                    ),

                    child: const CircleAvatar(
                      radius: 65,
                      backgroundImage:
                          AssetImage('assets/img/ft.avif'),
                    ),

                  ),


                  const SizedBox(height: 24),


                  const Text(
                    'Sofia Duran Medina',

                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      letterSpacing: 0.5,
                    ),

                  ),


                  const SizedBox(height: 8),


                  const Text(
                    'Aprendiz del SENA',

                    textAlign: TextAlign.center,

                    style: TextStyle(
                      fontSize: 16,
                      color: Color.fromARGB(
                        255,
                        180,
                        180,
                        180,
                      ),
                      fontWeight: FontWeight.w400,
                    ),

                  ),


                  const SizedBox(height: 20),


                  Container(
                    height: 2,
                    width: double.infinity,

                    decoration: BoxDecoration(

                      gradient: LinearGradient(

                        colors: [

                          accentColor.withValues(alpha: 0.0),
                          accentColor,
                          accentColor.withValues(alpha: 0.0),

                        ],

                      ),

                    ),

                  ),


                  const SizedBox(height: 24),


                  const Text(

                    'Estudiante del programa de Desarrollo de Software.'
                    'Tengo 18 años y me siento orgullosa de pertenecer a la familia SENA.',

                    textAlign: TextAlign.center,

                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white70,
                      height: 1.4,
                    ),

                  ),

                ],

              ),

            ),

          ),

        ),

      ),

    );
  }
}