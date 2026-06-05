import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: const Color.fromARGB(255, 101, 171, 71),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Hola mundo de color de rosa',
                style: TextStyle(
                  fontSize: 36,
                  color: const Color.fromARGB(255, 1, 94, 66),
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Roboto',
                ),
              ),

              SizedBox(height: 10),
              Text(
                'Soy Sofia Duran Medina',
                style: TextStyle(
                  fontSize: 20,
                  color: const Color.fromARGB(255, 77, 118, 187),
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Arial',
                ),
              ),

              SizedBox(height: 10),
              Text(
                'Analisis y Desarrollo ',
                style: TextStyle(
                  fontSize: 62,
                  color: const Color.fromARGB(255, 170, 76, 175),
                  fontStyle: FontStyle.italic,
                  fontFamily: 'Courier',
                ),

              ),
              SizedBox(height: 10),
              Text(
                'de Software',
                style: TextStyle(
                  fontSize: 50,
                  color: const Color.fromARGB(255, 30, 8, 54),
                  fontStyle: FontStyle.italic,
                  fontFamily: 'Arial',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}