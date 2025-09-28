import json

# Lire le fichier JSON
with open('/Users/borisvilboux/free/jm-tracker-react/src/data/ranking_plot-all.json', 'r') as f:
    plotly_data = json.load(f)

# Analyser la structure
print("Analyse du fichier ranking_plot-all.json:")
print(f"Nombre de séries: {len(plotly_data['data'])}")

# Identifier les types de séries
areas_series = []
line_series = []
annotations = plotly_data['layout']['annotations']

for i, series in enumerate(plotly_data['data']):
    if series.get('fill') == 'toself':
        areas_series.append(series)
        print(f"Série {i}: Aire empilée - {series['name']}")
    elif series.get('mode') == 'lines':
        line_series.append(series)
        print(f"Série {i}: Ligne - {series['name']}")
    elif series.get('mode') == 'markers':
        print(f"Série {i}: Marqueurs - {series['name']}")

print(f"\nTrouvé {len(areas_series)} aires empilées")
print(f"Trouvé {len(line_series)} lignes de candidats")
print(f"Trouvé {len(annotations)} annotations")

# Extraire les dates uniques
dates = []
for series in plotly_data['data']:
    if 'x' in series:
        dates.extend(series['x'])
unique_dates = sorted(list(set(dates)))
print(f"\nDates disponibles: {len(unique_dates)}")
print(f"De {unique_dates[0]} à {unique_dates[-1]}")

# Créer la configuration ECharts pour un graphique temporel avec aires + lignes
echarts_config = {
    "title": {
        "text": "Classement des candidats à l'élection présidentielle 2027",
        "left": "center",
        "textStyle": {
            "fontWeight": "bold"
        }
    },
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "cross"
        }
    },
    "legend": {
        "data": [s['name'] for s in areas_series] + ["Candidats"],
        "bottom": 0,
        "orient": "horizontal"
    },
    "grid": {
        "left": "3%",
        "right": "15%",
        "bottom": "10%",
        "top": "15%",
        "containLabel": True
    },
    "xAxis": {
        "type": "time",
        "boundaryGap": False
    },
    "yAxis": {
        "type": "value",
        "inverse": True,  # Inversion pour avoir le 1er en haut
        "min": 0,
        "max": 27,
        "name": "Position dans le classement",
        "nameLocation": "middle",
        "nameGap": 50
    },
    "series": []
}

# Analyser plus en détail les données des aires
print("\nAnalyse détaillée des aires empilées:")
for i, area in enumerate(areas_series):
    x_data = area['x']
    y_data = area['y']
    print(f"Aire {i} ({area['name']}):")
    print(f"  X data length: {len(x_data)}")
    print(f"  Y data length: {len(y_data)}")
    print(f"  Premiers X: {x_data[:5]}")
    print(f"  Premiers Y: {y_data[:5]}")
    print(f"  Derniers X: {x_data[-5:]}")
    print(f"  Derniers Y: {y_data[-5:]}")
    print()

# Pour les aires empilées, utiliser seulement les données significatives
# Ignorer les valeurs très faibles qui correspondent aux lignes de base
for area in areas_series:
    x_data = area['x']
    y_data = area['y']

    # Prendre seulement la première moitié des données (aller)
    half_length = len(x_data) // 2
    dates = x_data[:half_length]
    values = y_data[:half_length]

    # Pour la série "ni satisfait ni insatisfait", prendre les valeurs du retour (plus grandes)
    if area['name'] == 'ni satisfait ni insatisfait':
        # Pour cette série, les vraies valeurs sont dans la seconde moitié
        dates = x_data[half_length:]
        dates.reverse()  # Inverser pour remettre dans l'ordre chronologique
        values = y_data[half_length:]
        values.reverse()

    filtered_data = []
    for j, (date, value) in enumerate(zip(dates, values)):
        filtered_data.append([date, value])

    if filtered_data:  # Seulement si on a des données valides
        echarts_series = {
            "name": area['name'],
            "type": "line",
            "data": filtered_data,
            "areaStyle": {
                "opacity": 0.4,
                "color": area['fillcolor'].replace('0.5', '0.4')
            },
            "lineStyle": {
                "width": 1,
                "color": area['fillcolor'].replace('0.5', '0.8')
            },
            "stack": "zones",
            "smooth": False
        }
        echarts_config['series'].append(echarts_series)

# Ajouter les lignes des candidats (seulement celles avec 'lines')
candidate_colors = {}
for series in line_series:
    candidate_name = series['name']
    color = series['marker']['color']

    if candidate_name not in candidate_colors:
        candidate_colors[candidate_name] = color

        echarts_series = {
            "name": candidate_name,
            "type": "line",
            "data": [],
            "lineStyle": {
                "color": color,
                "width": 2
            },
            "symbol": "circle",
            "symbolSize": 4,
            "showSymbol": False
        }

        # Convertir les données temporelles
        for i, date in enumerate(series['x']):
            if i < len(series['y']):
                echarts_series['data'].append([date, series['y'][i]])

        echarts_config['series'].append(echarts_series)

# Simplifier la légende pour éviter la surcharge
echarts_config['legend']['data'] = [s['name'] for s in areas_series]
echarts_config['legend']['selectedMode'] = 'multiple'

# Sauvegarder la configuration ECharts
with open('/Users/borisvilboux/free/jm-tracker-react/src/data/echarts_ranking.json', 'w', encoding='utf-8') as f:
    json.dump(echarts_config, f, ensure_ascii=False, indent=2)

print(f"\nConfiguration ECharts créée avec {len(echarts_config['series'])} séries")
print("Fichier sauvegardé: echarts_ranking.json")