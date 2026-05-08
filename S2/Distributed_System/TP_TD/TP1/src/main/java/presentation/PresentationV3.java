package presentation;

import metier.IFacture;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class PresentationV3 {

    public static void main(String[] args) {

        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        IFacture facture = context.getBean("facture", IFacture.class);

        double resultat = facture.calculerFacture(100);

        System.out.println("Montant facture : " + resultat + " DH");
    }
}