import React, { useState } from 'react';
import './FindHospitalButton.css';
import AppointmentForm from './AppointmentForm';



const FindHospitalButton = ({ center }) => {
    const [hospitalName, setHospitalName] = useState('');
    const [distance, setDistance] = useState('');
    const [hospitalTime, setTime] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [isAppointmentFormVisible, setIsAppointmentFormVisible] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);


    const handleFindHospital = async () => {
        if (!selectedSpeciality) {
            alert('Please select a speciality');
            return;
        }

        try {
            const apiUrl = 'http://localhost:8080/appointment/findHospital';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: center.lat,
                    longitude: center.lng,
                    speciality: selectedSpeciality,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch hospitals from the API');
            }

            const responseData = await response.json();
            console.log('Réponse de l\'API :', responseData);
            setHospitalName(responseData.name);
            setDistance(responseData.distance);
            setTime(responseData.time);
            console.log('Informations de l\'hôpital récupérées avec succès !');
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de l\'hôpital :', error);
        }
        setIsAppointmentFormVisible(true);
    };

    const handleBookAppointment = (data) => {
        setAppointmentData(data);
        setIsAppointmentFormVisible(false);
    };


    const handleSpecialityChange = (event) => {
        setSelectedSpeciality(event.target.value);
    };

    return (

        <div>
            <select onChange={handleSpecialityChange} value={selectedSpeciality}>
                <option value="" disabled>Select Speciality</option>
                <option value="SOINS_INTENSIFS">Soins Intensifs</option>
                <option value="ONCOLOGIE_CLINIQUE">Oncologie Clinique</option>
                <option value="SPECIALITES_DENTAIRES_SUPPLEMENTAIRES">Spécialités Dentaires Supplémentaires</option>
                <option value="RADIOLOGIE_DENTAIRE_ET_MAXILLO_FACIALE">Radiologie Dentaire et Maxillo-Faciale</option>
                <option value="ENDODONTIE">Endodontie</option>
                <option value="CHIRURGIE_BUCCALE_ET_MAXILLO_FACIALE">Chirurgie Buccale et Maxillo-Faciale</option>
                <option value="PATHOLOGIE_BUCCALE_ET_MAXILLO_FACIALE">Pathologie Buccale et Maxillo-Faciale</option>
                <option value="MEDECINE_BUCCALE">Médecine Buccale</option>
                <option value="CHIRURGIE_BUCCALE">Chirurgie Buccale</option>
                <option value="ORTHODONTIE">Orthodontie</option>
                <option value="DENTISTERIE_PEDIATRIQUE">Dentisterie Pédiatrique</option>
                <option value="PARODONTIE">Parodontie</option>
                <option value="PROSTHODONTIE">Prosthodontie</option>
                <option value="DENTISTERIE_RESTAURATRICE">Dentisterie Restauratrice</option>
                <option value="DENTISTERIE_DE_SOINS_SPECIAUX">Dentisterie de Soins Spéciaux</option>
                <option value="MEDECINE_D_URGENCE">Médecine d'Urgence</option>
                <option value="MEDECINE_INTERNE_DE_SOINS_AIGUS">Médecine Interne de Soins Aigus</option>
                <option value="ALLERGIE">Allergie</option>
                <option value="MEDECINE_AUDIOVESTIBULAIRE">Médecine Audiovestibulaire</option>
                <option value="CARDIOLOGIE">Cardiologie</option>
                <option value="GENETIQUE_CLINIQUE">Génétique Clinique</option>
                <option value="NEUROPHYSIOLOGIE_CLINIQUE">Neurophysiologie Clinique</option>
                <option value="PHARMACOLOGIE_CLINIQUE_ET_THERAPEUTIQUE">Pharmacologie Clinique et Thérapeutique</option>
                <option value="DERMATOLOGIE">Dermatologie</option>
                <option value="ENDOCRINOLOGIE_ET_DIABETE_SUCRE">Endocrinologie et Diabète Sucre</option>
                <option value="GASTROENTEROLOGIE">Gastroentérologie</option>
                <option value="MEDECINE_GENERALE_INTERNE">Médecine Générale Interne</option>
                <option value="MEDECINE_GENERALE">Médecine Générale</option>
                <option value="MEDECINE_GENERALE_GP_6_MOIS">Médecine Générale GP 6 Mois</option>
                <option value="MEDECINE_GENITO_URINAIRE">Médecine Génito-Urinaire</option>
                <option value="MEDECINE_GERIATRIQUE">Médecine Gériatrique</option>
                <option value="MALADIES_INFECTIEUSES">Maladies Infectieuses</option>
                <option value="ONCOLOGIE_MEDICALE">Oncologie Médicale</option>
                <option value="OPHTALMOLOGIE_MEDICALE">Ophtalmologie Médicale</option>
                <option value="NEUROLOGIE">Neurologie</option>
                <option value="MEDECINE_DU_TRAVAIL">Médecine du Travail</option>
                <option value="AUTREALE">Autreale</option>
                <option value="MEDECINE_PALLIATIVE">Médecine Palliative</option>
                <option value="MEDECINE_DE_READAPTATION">Médecine de Réadaptation</option>
                <option value="MEDECINE_RENALE">Médecine Rénale</option>
                <option value="MEDECINE_RESPIRATOIRE">Médecine Respiratoire</option>
                <option value="RHUMATOLOGIE">Rhumatologie</option>
                <option value="MEDECINE_DU_SPORT_ET_DE_L_EXERCICE">Médecine du Sport et de l'Exercice</option>
                <option value="SANTE_PUBLIQUE_SEXUELLE_ET_PROCREATIVE">Santé Publique Sexuelle et Procréative</option>
                <option value="CARDIOLOGIE_PEDIATRIQUE">Cardiologie Pédiatrique</option>
                <option value="PEDIATRIE">Pédiatrie</option>
                <option value="PATHOLOGIE_CHIMIQUE">Pathologie Chimique</option>
                <option value="NEUROPATHOLOGIE_DIAGNOSTIQUE">Neuropathologie Diagnostique</option>
                <option value="HISTOPATHOLOGIE_MEDICO_LEGALE">Histopathologie Médico-Légale</option>
                <option value="PATHOLOGIE_GENERALE">Pathologie Générale</option>
                <option value="HEMATOLOGIE">Hématologie</option>
                <option value="HISTOPATHOLOGIE">Histopathologie</option>
                <option value="IMMUNOLOGIE">Immunologie</option>
                <option value="MICROBIOLOGIE_MEDICALE">Microbiologie Médicale</option>
                <option value="PATHOLOGIE_PEDIATRIQUE_ET_PERINATALE">Pathologie Pédiatrique et Périnatale</option>
                <option value="VIROLOGIE">Virologie</option>
                <option value="SERVICE_DE_SANTE_COMMUNAUTAIRE_DENTAIRE">Service de Santé Communautaire Dentaire</option>
                <option value="SERVICE_DE_SANTE_COMMUNAUTAIRE_MEDICALE">Service de Santé Communautaire Médicale</option>
                <option value="SANTE_PUBLIQUE_DENTAIRE">Santé Publique Dentaire</option>
                <option value="PRATIQUE_DE_L_ART_DENTAIRE">Pratique de l'Art Dentaire</option>
                <option value="SANTE_PUBLIQUE">Santé Publique</option>
                <option value="PSYCHIATRIE_LEGALE">Psychiatrie Légale</option>
                <option value="PSYCHIATRIE_GENERALE">Psychiatrie Générale</option>
                <option value="PSYCHIATRIE_DE_LA_VIEILLESSE">Psychiatrie de la Vieillesse</option>
                <option value="PSYCHIATRIE_DES_TROUBLES_D_APPRENTISSAGE">Psychiatrie des Troubles d'Apprentissage</option>
                <option value="PSYCHOTHERAPIE">Psychothérapie</option>
                <option value="RADIOLOGIE_CLINIQUE">Radiologie Clinique</option>
                <option value="MEDECINE_NUCLEAIRE">Médecine Nucléaire</option>
                <option value="CHIRURGIE_CARDIOTHORACIQUE">Chirurgie Cardiothoracique</option>
                <option value="CHIRURGIE_GENERALE">Chirurgie Générale</option>
                <option value="NEUROCHIRURGIE">Neurochirurgie</option>
                <option value="OPHTALMOLOGIE">Ophtalmologie</option>
                <option value="OTOLARYNGOLOGIE">Otolaryngologie</option>
                <option value="CHIRURGIE_PEDIATRIQUE">Chirurgie Pédiatrique</option>
                <option value="CHIRURGIE_PLASTIQUE">Chirurgie Plastique</option>
                <option value="TRAUMATOLOGIE_ET_CHIRURGIE_ORTHOPEDIQUE">Traumatologie et Chirurgie Orthopédique</option>
                <option value="UROLOGIE">Urologie</option>
                <option value="CHIRURGIE_VASCULAIRE">Chirurgie Vasculaire</option>
            </select>
            <button onClick={handleFindHospital}>
                Trouver l'hôpital le plus proche
            </button>

            {isAppointmentFormVisible && (
                <AppointmentForm onBookAppointment={handleBookAppointment}
                    selectedSpeciality={selectedSpeciality}
                    lat={center.lat}
                    lng={center.lng}
                    hospitalName={hospitalName}
                    distance={distance}
                    hospitalTime={hospitalTime}
                />
            )}

            {appointmentData && (
                <div className="success-message">
                    <p>{`Rendez-vous réservé pour ${appointmentData.firstName} ${appointmentData.lastName} le ${appointmentData.date} a ${appointmentData.time} dans l'hopital :  ${hospitalName}`}</p>
                </div>
            )}
        </div>

    );
};

export default FindHospitalButton;