package dao;

import org.springframework.stereotype.Repository;

@Repository
public class TarifDomestique implements ITarifElectricite {

    @Override
    public double getPrixKwh() {
        return 0.9;
    }
}