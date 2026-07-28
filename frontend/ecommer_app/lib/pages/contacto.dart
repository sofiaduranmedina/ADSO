import 'package:flutter/material.dart';

class ContactoPage extends StatelessWidget {
  const ContactoPage({super.key});

  @override
  Widget build(BuildContext context) {
    const accentColor = Color(0xFF4DD0E1);

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 129, 180, 196),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "Contacto",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          margin: const EdgeInsets.all(20),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color.fromARGB(255, 28, 28, 28),
            borderRadius: BorderRadius.circular(20),
          ),
          child: const Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.mail, color: accentColor, size: 60),
              SizedBox(height: 15),
              Text(
                "Sofía Durán Medina",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                "📧 sofia@gmail.com",
                style: TextStyle(color: Colors.white70),
              ),
              SizedBox(height: 5),
              Text(
                "📞 +57 300 123 4567",
                style: TextStyle(color: Colors.white70),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Container(
        color: const Color.fromARGB(255, 20, 24, 26),
        padding: const EdgeInsets.all(12),
        child: const Text(
          "© 2026 Sofía Durán Medina",
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white70),
        ),
      ),
    );
  }
}