package fr.uwu;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class AppConfig {

    @Bean
    public ReseauMetro reseauMetro() {
        DbConnector db = DbConnector.getDbFromResourceFile();
        List<Quai> stations = db.get_stations();
        List<Relation> relations = db.get_relations(stations);

        System.out.println("Nombre de relations: " + relations.size());

        ReseauMetro reseau = new ReseauMetro(new ArrayList<Quai>(stations), new ArrayList<Relation>(relations));

        reseau.verificationConnexe();

        return reseau;
    }

    // Autres configurations si nécessaires
}