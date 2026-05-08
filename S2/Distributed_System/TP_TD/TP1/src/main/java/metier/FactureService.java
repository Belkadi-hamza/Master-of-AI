package metier;

import dao.ITarifElectricite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FactureService implements IFacture {

    @Autowired
    private ITarifElectricite tarifElectricite;

    // injection par setter
//    public void setTarifElectricite(ITarifElectricite tarifElectricite) {
//        this.tarifElectricite = tarifElectricite;
//    }

    @Override
    public double calculerFacture(double quantite) {

        double prix = tarifElectricite.getPrixKwh();

        return quantite * prix;
    }
}