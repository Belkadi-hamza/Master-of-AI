package presentation;

import dao.ITarifElectricite;
import metier.FactureService;

import java.io.BufferedReader;
import java.io.FileReader;
import java.lang.reflect.Method;

public class PresentationV2 {

    public static void main(String[] args) throws Exception {

        // lecture du fichier config.txt
        BufferedReader br = new BufferedReader(
                new FileReader("src/main/resources/config.txt")
        );

        // lire le nom de la classe
        String className1 = br.readLine();
        String className2 = br.readLine();

        // charger la classe dynamiquement
        Class cDao = Class.forName(className2);

        // créer l'objet dynamiquement
        ITarifElectricite tarif = (ITarifElectricite) cDao.getDeclaredConstructor().newInstance();

        // création du service métier
        FactureService factureService = new FactureService();

        // récupérer la méthode setter
        Method method = FactureService.class.getMethod(
                "setTarifElectricite",
                ITarifElectricite.class
        );

        // injection dynamique
        method.invoke(factureService, tarif);

        // calcul
        double resultat = factureService.calculerFacture(100);

        // affichage
        System.out.println("Montant facture : " + resultat + " DH");
    }
}