function GrillasView({ grillas, setGrillas, efemerides, setEfemerides }) {
  const REF_Y = 2026;
  const todayRef = new Date(REF_Y, 3, 6);
  const pad2 = (n) => String(n).padStart(2, "0");
  const toKey = (dt) => `${pad2(dt.getDate())}/${pad2(dt.getMonth() + 1)}`;
  const parseDdMm = (s) => {
    const p = String(s || "").split("/");
    if (p.length < 2) return null;
    const d = Number(p[0]);
    const m = Number(p[1]);
    if (!d || !m) return null;
    return new Date(REF_Y, m - 1, d);
  };
  const startOfDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const deadlineTone = (deadlineStr) => {
    const dt = parseDdMm(deadlineStr);
    if (!dt) return B.textMuted;
    const t0 = startOfDay(todayRef).getTime();
    const t1 = startOfDay(dt).getTime();
    if (t1 < t0) return B.danger;
    if (t1 === t0) return B.warning;
    return B.textMuted;
  };

  const [brandSel, setBrandSel] = useState(grillas[0]?.brand || "fatty");
  const [monthSel, setMonthSel] = useState("04/2026");
  const [viewMode, setViewMode] = useState("calendario");
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showEfe, setShowEfe] = useState(false);
  const [draftCaption, setDraftCaption] = useState("");
  const [draftConcept, setDraftConcept] = useState("");
  const [newPost, setNewPost] = useState({
    date: "",
    objective: "alcance",
    type: "post",
    network: "ig",
    concept: "",
    caption: "",
    reference: "",
    campaignId: "",
  });
  const [efeNew, setEfeNew] = useState({ date: "", name: "", brands: [] });

  const grilla = grillas.find((g) => g.brand === brandSel && g.month === monthSel);
  const posts = grilla?.posts || [];
  const br = getBrand(brandSel);

  const counts = {
    total: posts.length,
    aprobado: posts.filter((p) => p.status === "aprobado").length,
    borrador: posts.filter((p) => p.status === "borrador").length,
    enviado: posts.filter((p) => p.status === "enviado").length,
    cambios: posts.filter((p) => p.status === "cambios").length,
  };

  const selectedPost =
    selected && grilla ? grilla.posts.find((p) => p.id === selected.postId) : null;

  useEffect(() => {
    if (selectedPost) {
      setDraftCaption(selectedPost.caption || "");
      setDraftConcept(selectedPost.concept || "");
    } else {
      setDraftCaption("");
      setDraftConcept("");
    }
  }, [selected, selectedPost?.id]);

  const updatePost = (gid, pid, updater) => {
    setGrillas((prev) =>
      prev.map((g) =>
        g.id !== gid ? g : { ...g, posts: g.posts.map((p) => (p.id !== pid ? p : updater(p))) }
      )
    );
  };

  const postBorder = (st) => {
    if (st === "aprobado") return `2px solid ${B.success}`;
    if (st === "cambios") return `2px solid ${B.warning}`;
    if (st === "enviado") return `2px solid ${B.info}`;
    return `1px solid ${B.border}`;
  };

  const objMeta = (id) => POST_OBJECTIVES.find((o) => o.id === id) || POST_OBJECTIVES[0];
  const typeLabel = (t) => CONTENT_TYPES.find((c) => c.id === t)?.name || t;

  const aprilEfems = efemerides.filter((e) => e.date.endsWith("/04"));
  const first = new Date(REF_Y, 3, 1);
  const lead = (first.getDay() + 6) % 7;
  const gridStart = new Date(REF_Y, 3, 1 - lead);
  const monthCells = [];
  for (let i = 0; i < 42; i++) {
    const c = new Date(gridStart);
    c.setDate(gridStart.getDate() + i);
    monthCells.push(c);
  }
  const inApril = (dt) => dt.getMonth() === 3 && dt.getFullYear() === REF_Y;
  const isToday = (dt) => dt.getDate() === 6 && dt.getMonth() === 3 && dt.getFullYear() === REF_Y;

  const postsByDate = (key) => posts.filter((p) => p.date === key);
  const activeCampOpts = CAMPAIGNS.filter((c) => ["en_produccion", "aprobada"].includes(c.status));

  const addPost = () => {
    if (!grilla || !newPost.date.trim() || !newPost.concept.trim()) return;
    const nid = `np-${Date.now()}`;
    setGrillas((prev) =>
      prev.map((g) =>
        g.id !== grilla.id
          ? g
          : {
              ...g,
              posts: [
                ...g.posts,
                {
                  id: nid,
                  date: newPost.date.trim(),
                  objective: newPost.objective,
                  type: newPost.type,
                  network: newPost.network,
                  concept: newPost.concept.trim(),
                  caption: newPost.caption.trim(),
                  reference: newPost.reference.trim(),
                  status: "borrador",
                  campaignId: newPost.campaignId === "" ? null : Number(newPost.campaignId),
                },
              ],
            }
      )
    );
    setShowNew(false);
    setNewPost({
      date: "",
      objective: "alcance",
      type: "post",
      network: "ig",
      concept: "",
      caption: "",
      reference: "",
      campaignId: "",
    });
  };

  const addEfemeride = () => {
    if (!efeNew.date.trim() || !efeNew.name.trim() || efeNew.brands.length === 0) return;
    const nid = efemerides.reduce((m, e) => Math.max(m, e.id || 0), 0) + 1;
    setEfemerides((prev) => [
      ...prev,
      { id: nid, date: efeNew.date.trim(), name: efeNew.name.trim(), brands: [...efeNew.brands], hasCampaign: false },
    ]);
    setEfeNew({ date: "", name: "", brands: [] });
  };

  const removeEfe = (id) => setEfemerides((prev) => prev.filter((e) => e.id !== id));

  const saveDraftsToPost = () => {
    if (!grilla || !selectedPost) return;
    updatePost(grilla.id, selectedPost.id, (p) => ({ ...p, caption: draftCaption, concept: draftConcept }));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <Select
          value={brandSel}
          onChange={setBrandSel}
          options={grillas.map((g) => ({ value: g.brand, label: getBrand(g.brand).name }))}
        />
        <Select value={monthSel} onChange={setMonthSel} options={[{ value: "04/2026", label: "Abril 2026" }]} />
        <Badge color={B.text} bg={B.surfaceHover}>
          {counts.aprobado}/{counts.total} aprobados
        </Badge>
        <Badge color={B.textMuted} bg={B.surfaceHover}>
          {counts.borrador} borrador
        </Badge>
        <Badge color={B.info} bg={B.infoBg}>
          {counts.enviado} enviados
        </Badge>
        {counts.cambios > 0 && (
          <Badge color={B.warning} bg={B.warningBg}>
            {counts.cambios} con cambios
          </Badge>
        )}
        <Btn variant="default" onClick={() => setShowEfe((v) => !v)} style={{ fontSize: 12 }}>
          📅 Efemérides
        </Btn>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: B.surfaceHover, borderRadius: 8, padding: 2 }}>
          {[
            { id: "calendario", label: "Calendario" },
            { id: "lista", label: "Lista" },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setViewMode(v.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                fontSize: 13,
                fontWeight: viewMode === v.id ? 700 : 500,
                background: viewMode === v.id ? B.surface : "transparent",
                color: viewMode === v.id ? B.text : B.textMuted,
                cursor: "pointer",
                fontFamily: font,
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
        <Btn variant="primary" onClick={() => setShowNew((s) => !s)} style={{ fontSize: 12 }}>
          + Nuevo post
        </Btn>
      </div>

      {showEfe && (
        <Card style={{ marginBottom: 14, background: B.surfaceHover, border: `1px dashed ${B.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Efemérides (abril)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 4 }}>Fecha DD/MM</div>
              <input
                value={efeNew.date}
                onChange={(e) => setEfeNew((x) => ({ ...x, date: e.target.value }))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 4 }}>Nombre</div>
              <input
                value={efeNew.name}
                onChange={(e) => setEfeNew((x) => ({ ...x, name: e.target.value }))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 6 }}>Marcas</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {activeBrands.map((b) => (
              <label key={b.id} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={efeNew.brands.includes(b.id)}
                  onChange={() =>
                    setEfeNew((x) => ({
                      ...x,
                      brands: x.brands.includes(b.id) ? x.brands.filter((y) => y !== b.id) : [...x.brands, b.id],
                    }))
                  }
                />
                {b.name}
              </label>
            ))}
          </div>
          <Btn variant="primary" style={{ fontSize: 12 }} onClick={addEfemeride}>
            Agregar efeméride
          </Btn>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {aprilEfems.map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                <span>
                  <strong>{e.date}</strong> {e.name}{" "}
                  {e.brands.map((bid) => (
                    <Badge key={bid} color={getBrand(bid).color} bg={`${getBrand(bid).color}12`}>
                      {getBrand(bid).name}
                    </Badge>
                  ))}
                </span>
                <Btn variant="ghost" style={{ fontSize: 11 }} onClick={() => removeEfe(e.id)}>
                  Eliminar
                </Btn>
              </div>
            ))}
          </div>
        </Card>
      )}

      {showNew && grilla && (
        <Card style={{ marginBottom: 14, border: `2px dashed ${B.accent}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Nuevo post</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Fecha</div>
              <input
                value={newPost.date}
                onChange={(e) => setNewPost((x) => ({ ...x, date: e.target.value }))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Objetivo</div>
              <Select
                value={newPost.objective}
                onChange={(v) => setNewPost((x) => ({ ...x, objective: v }))}
                options={POST_OBJECTIVES.map((o) => ({ value: o.id, label: o.label }))}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Tipo</div>
              <Select
                value={newPost.type}
                onChange={(v) => setNewPost((x) => ({ ...x, type: v }))}
                options={CONTENT_TYPES.map((c) => ({ value: c.id, label: c.name }))}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Red</div>
              <Select
                value={newPost.network}
                onChange={(v) => setNewPost((x) => ({ ...x, network: v }))}
                options={NETWORKS.map((n) => ({ value: n.id, label: `${n.icon} ${n.name}` }))}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, color: B.textMuted }}>Concepto</div>
              <input
                value={newPost.concept}
                onChange={(e) => setNewPost((x) => ({ ...x, concept: e.target.value }))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, color: B.textMuted }}>Caption</div>
              <textarea
                value={newPost.caption}
                onChange={(e) => setNewPost((x) => ({ ...x, caption: e.target.value }))}
                rows={3}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, color: B.textMuted }}>Referencia</div>
              <input
                value={newPost.reference}
                onChange={(e) => setNewPost((x) => ({ ...x, reference: e.target.value }))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Campaña (opcional)</div>
              <Select
                value={newPost.campaignId}
                onChange={(v) => setNewPost((x) => ({ ...x, campaignId: v }))}
                options={[{ value: "", label: "Sin campaña" }, ...activeCampOpts.map((c) => ({ value: String(c.id), label: c.name }))]}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <Btn variant="primary" onClick={addPost}>
              Agregar
            </Btn>
            <Btn variant="default" onClick={() => setShowNew(false)}>
              Cancelar
            </Btn>
          </div>
        </Card>
      )}

      {viewMode === "calendario" && grilla && (
        <Card style={{ padding: 0, overflow: "hidden", marginBottom: 12 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              borderBottom: `1px solid ${B.border}`,
              background: "#FAFAF8",
            }}
          >
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((h) => (
              <div key={h} style={{ padding: 8, fontSize: 11, fontWeight: 700, color: B.textMuted, textAlign: "center" }}>
                {h}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {monthCells.map((cell, idx) => {
              const key = toKey(cell);
              const dayPosts = postsByDate(key);
              const ef = aprilEfems.find((e) => e.date === key);
              const outside = !inApril(cell);
              const today = isToday(cell);
              return (
                <div
                  key={idx}
                  style={{
                    minHeight: 88,
                    borderRight: (idx + 1) % 7 === 0 ? "none" : `1px solid ${B.border}`,
                    borderBottom: idx < 35 ? `1px solid ${B.border}` : "none",
                    padding: 6,
                    opacity: outside ? 0.35 : 1,
                    background: today ? `${B.accent}12` : "transparent",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{cell.getDate()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {ef && (
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          padding: "2px 4px",
                          borderRadius: 4,
                          background: B.warningBg,
                          color: B.warning,
                          borderLeft: `3px solid ${B.warning}`,
                        }}
                      >
                        📅 {ef.name.slice(0, 14)}
                        {ef.name.length > 14 ? "…" : ""}
                      </div>
                    )}
                    {dayPosts.map((p) => {
                      const om = objMeta(p.objective);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelected({ grillaId: grilla.id, postId: p.id })}
                          style={{
                            textAlign: "left",
                            cursor: "pointer",
                            fontFamily: font,
                            fontSize: 9,
                            fontWeight: 600,
                            padding: "3px 5px",
                            borderRadius: 4,
                            background: `${br.color}10`,
                            border: postBorder(p.status),
                            boxShadow: `inset 3px 0 0 0 ${br.color}`,
                            color: B.text,
                          }}
                        >
                          <span style={{ color: om.color }}>●</span> {typeLabel(p.type)}
                          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.concept}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === "lista" && grilla && (
        <Card style={{ padding: 0, overflow: "hidden", marginBottom: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font }}>
            <thead>
              <tr style={{ background: "#FAFAF8", borderBottom: `1px solid ${B.border}` }}>
                {["Fecha", "Objetivo", "Tipo", "Red", "Concepto", "Caption", "Campaña", "Estado"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: B.textMuted, fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...posts].sort((a, b) => a.date.localeCompare(b.date, undefined, { numeric: true })).map((p) => {
                const camp = p.campaignId != null ? CAMPAIGNS.find((c) => c.id === p.campaignId) : null;
                const om = objMeta(p.objective);
                const capT = p.caption.length > 36 ? p.caption.slice(0, 36) + "…" : p.caption;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelected({ grillaId: grilla.id, postId: p.id })}
                    style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  >
                    <td style={{ padding: "8px 10px" }}>{p.date}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <Badge color={om.color} bg={om.bg}>
                        {om.label}
                      </Badge>
                    </td>
                    <td style={{ padding: "8px 10px" }}>{typeLabel(p.type)}</td>
                    <td style={{ padding: "8px 10px" }}>{NETWORKS.find((n) => n.id === p.network)?.icon}</td>
                    <td style={{ padding: "8px 10px", fontWeight: 600 }}>{p.concept}</td>
                    <td style={{ padding: "8px 10px", color: B.textMuted, whiteSpace: "pre-line" }}>{capT}</td>
                    <td style={{ padding: "8px 10px" }}>{camp ? camp.name : "—"}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <Badge
                        color={
                          p.status === "aprobado" ? B.success : p.status === "cambios" ? B.warning : p.status === "enviado" ? B.info : B.textMuted
                        }
                        bg={B.surfaceHover}
                      >
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 10 }}>
        {counts.total} posts · {counts.aprobado} aprobados · {counts.borrador} borrador · {counts.enviado} enviados · {counts.cambios} con cambios
      </div>

      {selectedPost && grilla && (
        <Card style={{ marginTop: 8, borderTop: `3px solid ${br.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{selectedPost.concept}</div>
              <div style={{ fontSize: 12, color: B.textMuted, marginTop: 4 }}>
                {selectedPost.date} · {getBrand(brandSel).name}
              </div>
            </div>
            <Btn variant="default" onClick={() => setSelected(null)}>
              Cerrar
            </Btn>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            <Badge color={objMeta(selectedPost.objective).color} bg={objMeta(selectedPost.objective).bg}>
              {objMeta(selectedPost.objective).label}
            </Badge>
            <Badge>{typeLabel(selectedPost.type)}</Badge>
            <Badge>{NETWORKS.find((n) => n.id === selectedPost.network)?.icon} {NETWORKS.find((n) => n.id === selectedPost.network)?.name}</Badge>
            {selectedPost.campaignId != null ? (
              <Badge>{CAMPAIGNS.find((c) => c.id === selectedPost.campaignId)?.name}</Badge>
            ) : (
              <Badge color={B.textMuted} bg={B.surfaceHover}>
                Sin campaña
              </Badge>
            )}
            <Badge
              color={
                selectedPost.status === "aprobado"
                  ? B.success
                  : selectedPost.status === "cambios"
                    ? B.warning
                    : selectedPost.status === "enviado"
                      ? B.info
                      : B.textMuted
              }
              bg={B.surfaceHover}
            >
              {selectedPost.status}
            </Badge>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, marginBottom: 4 }}>Concepto (editable)</div>
          <input
            value={draftConcept}
            onChange={(e) => setDraftConcept(e.target.value)}
            onBlur={saveDraftsToPost}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font, marginBottom: 10 }}
          />
          <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, marginBottom: 4 }}>Caption (editable)</div>
          <textarea
            value={draftCaption}
            onChange={(e) => setDraftCaption(e.target.value)}
            onBlur={saveDraftsToPost}
            rows={5}
            readOnly={false}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font, background: B.surfaceHover, marginBottom: 10 }}
          />
          <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 8 }}>Referencia: {selectedPost.reference}</div>
          {selectedPost.status === "borrador" && (
            <Btn
              variant="primary"
              onClick={() => updatePost(grilla.id, selectedPost.id, (p) => ({ ...p, status: "enviado" }))}
              style={{ marginRight: 8 }}
            >
              Enviar a aprobación
            </Btn>
          )}
          {selectedPost.status === "enviado" && <div style={{ fontSize: 12, color: B.info, fontWeight: 600 }}>Esperando aprobación…</div>}
          {selectedPost.status === "cambios" && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ background: B.warningBg, borderRadius: 8, padding: 10, border: `1px solid ${B.warning}33`, marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: B.warning, fontSize: 12 }}>Feedback</div>
                <div style={{ fontSize: 12 }}>{selectedPost.feedback}</div>
              </div>
              <Btn variant="primary" onClick={() => updatePost(grilla.id, selectedPost.id, (p) => ({ ...p, status: "enviado", feedback: undefined }))}>
                Reenviar
              </Btn>
            </div>
          )}
          {selectedPost.status === "aprobado" && (
            <Badge color={B.success} bg={B.successBg}>
              Aprobado
            </Badge>
          )}
        </Card>
      )}
    </div>
  );
}
