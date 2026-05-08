package presentation;

import dao.TarifDomestique;
import dao.TarifIndustriel;
import metier.FactureService;

public class PresentationV1 {

    public static void main(String[] args) {

        // création manuelle de l'objet DAO
        TarifDomestique tarif = new TarifDomestique();
//        TarifIndustriel tarif = new TarifIndustriel();

        // création du service métier
        FactureService factureService = new FactureService();

        // injection de dépendance via setter
//        factureService.setTarifElectricite(tarif);

        // calcul de la facture
        double resultat = factureService.calculerFacture(100);

        // affichage
        System.out.println("Montant facture : " + resultat + " DH");
    }
}