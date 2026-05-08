package dao;

import org.springframework.stereotype.Repository;

//@Repository
public class TarifIndustriel implements ITarifElectricite {

    @Override
    public double getPrixKwh() {
        return 1.5;
    }
}