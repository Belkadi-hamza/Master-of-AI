package presentation;

import metier.IFacture;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class PresentationV4 {

    public static void main(String[] args) {

        ApplicationContext context =
                new AnnotationConfigApplicationContext("dao", "metier");

        IFacture facture = context.getBean(IFacture.class);

        double resultat = facture.calculerFacture(100);

        System.out.println("Montant facture : " + resultat + " DH");
    }
}