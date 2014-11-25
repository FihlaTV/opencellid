CREATE TABLE cell (
    radio TEXT,
    mcc INTEGER,
    mnc INTEGER,
    lac INTEGER,
    cellid INTEGER,
    unit TEXT, -- no clue
    lon INTEGER,
    lat INTEGER,
    range INTEGER,
    nbSamples INTEGER,
    changeable INTEGER,
    created_at TEXT,
    updated_at TEXT,
    average_signal INTEGER

    -- lat REAL,
    -- lon REAL,
    -- mcc INTEGER,
    -- mnc INTEGER,
    -- lac INTEGER,
    -- cellid INTEGER,
    -- range INTEGER,
    -- nbSamples INTEGER,
    -- created_at TEXT,
    -- updated_at TEXT,
    -- zero INTEGER
);
CREATE INDEX cell_idx ON cell(mcc, mnc, lac, cellid);
