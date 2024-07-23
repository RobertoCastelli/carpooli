# Struttura del Progetto

## Componenti

- **App**: Componente principale che gestisce lo stato dell'app e le transizioni tra le varie visualizzazioni.
- **SelectDriver**: Componente per selezionare un autista.
- **SelectCar**: Componente per selezionare un'auto disponibile.
- **RegisterDeparture**: Componente per registrare la partenza dell'auto.
- **CheckOut**: Componente per il check-out dell'auto.

## Stato dell'Applicazione

- **selectedDriver**: L'autista attualmente selezionato.
- **activeCar**: L'auto attualmente in uso.
- **departureKM**: Chilometri di partenza.
- **carCondition**: Condizione dell'auto.
- **destination**: Destinazione del viaggio.
- **returnKM**: Chilometri finali.
- **gasExpenses**: Spese di benzina.

```mermaid
flowchart TD
    A[Start] --> B[Select Driver]
    B --> C{Driver Has Active Car?}
    C -->|Yes| D[Proceed to Check-Out]
    C -->|No| E[Select Car]
    E --> F[Register Departure]
    F --> G[Enter Departure KM, Car Condition, and Destination]
    G --> H[Car is Reserved]
    H --> I[User Drives Car]
    I --> J[Return to App]
    J --> B
    D --> K[Enter Return KM and Gas Expenses]
    K --> L[Update Car Status]
    L --> M[Release Car for Other Users]
    M --> N[End]
```
